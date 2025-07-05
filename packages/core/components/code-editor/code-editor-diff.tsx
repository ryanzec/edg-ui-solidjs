import styles from '$/core/components/code-editor/code-editor.module.css';
import {
  CodeEditorChunkDecision,
  CodeEditorDiffType,
  type CodeEditorLanguageConfiguration,
  defaultExtensions,
} from '$/core/components/code-editor/utils';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';
import { lintGutter, linter } from '@codemirror/lint';
import { type Chunk, MergeView, getChunks, getOriginalDoc, unifiedMergeView } from '@codemirror/merge';
import { EditorState, type Extension, type Text } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { type JSX, createSignal, mergeProps, onMount, splitProps } from 'solid-js';

const findModifiedChunks = (prevChunks: readonly Chunk[], currChunks: readonly Chunk[]): Chunk[] => {
  return prevChunks.filter(
    (prevChunk) =>
      !currChunks.some(
        (currChunk) =>
          prevChunk.fromA === currChunk.fromA &&
          prevChunk.toA === currChunk.toA &&
          prevChunk.fromB === currChunk.fromB &&
          prevChunk.toB === currChunk.toB,
      ),
  );
};

const buildDocumentWithAcceptedChunks = (originalDoc: Text, acceptedChunks: AcceptedChunk[]): string => {
  const originalString = originalDoc.toString();

  // Create an array to track position shifts
  type Shift = { pos: number; delta: number };
  const shifts: Shift[] = [];

  // Sort chunks by original position (lower to higher)
  const sortedChunks = [...acceptedChunks].sort((a, b) => a.fromA - b.fromA);

  // Apply each chunk and track position shifts
  let result = originalString;

  for (const chunk of sortedChunks) {
    let adjustedFromA = chunk.fromA;
    let adjustedToA = chunk.toA;

    // adjust the positions based on previous shifts
    for (const shift of shifts) {
      if (shift.pos <= adjustedFromA) {
        adjustedFromA += shift.delta;
        adjustedToA += shift.delta;
      } else if (shift.pos < adjustedToA) {
        // Partial overlap case
        adjustedToA += shift.delta;
      }
    }

    result = result.substring(0, adjustedFromA) + chunk.content + result.substring(adjustedToA);

    // Calculate the shift this change creates
    const originalLength = adjustedToA - adjustedFromA;
    const newLength = chunk.content.length;
    const delta = newLength - originalLength;

    // Record the shift
    shifts.push({ pos: adjustedToA, delta });
  }

  return result;
};

type AcceptedChunk = {
  fromA: number;
  toA: number;
  fromB: number;
  toB: number;
  content: string;
};

export type CodeEditorDiffProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    // some of these name don't match standard convention however I think it is better to have these props match
    // codemirror properties when possible to make it easier to use
    doc: string;
    suggestedDoc: string;
    language?: CodeEditorLanguageConfiguration;
    extensions?: Extension[];
    isBorderless?: boolean;
    diffType?: CodeEditorDiffType;
    onChunkDecision?: (decision: CodeEditorChunkDecision, newDoc: string) => void;
  };

const CodeEditor = (passedProps: CodeEditorDiffProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        doc: '',
        extensions: [],
        isBorderless: false,
        diffType: CodeEditorDiffType.SIDE_BY_SIDE,
      },
      passedProps,
    ),
    ['class', 'doc', 'extensions', 'language', 'isBorderless', 'suggestedDoc', 'diffType', 'onChunkDecision'],
  );

  let containerElement: HTMLDivElement | undefined;

  const [editorView, setEditorView] = createSignal<EditorView>();
  const [mergeView, setMergeView] = createSignal<MergeView>();
  const [acceptedChunks, setAcceptedChunks] = createSignal<AcceptedChunk[]>([]);
  const [originalDocument, setOriginalDocument] = createSignal<Text>();

  onMount(() => {
    const extensions: Extension[] = [
      ...defaultExtensions,
      EditorView.theme({
        '&': {
          height: '100%',
          width: '100%',
        },
        '.cm-scroller': {
          height: '100%',
        },
        '.cm-blank-line': {
          backgroundColor: 'rgb(240, 240, 240)',
        },
      }),
      EditorState.readOnly.of(true),
      EditorView.editable.of(false),
      ...props.extensions,
    ];

    if (props.language) {
      extensions.push(props.language.extension);

      if (props.language.linter) {
        extensions.push(lintGutter());
        extensions.push(
          linter(props.language.linter, {
            delay: 750,
          }),
        );
      }
    }

    // this is used to trigger an event when a chunk is accepted or reverted so consume can update relevant things
    // as the yaml changes
    if (props.diffType === CodeEditorDiffType.UNIFIED) {
      setEditorView(
        new EditorView({
          parent: containerElement,
          doc: props.suggestedDoc,
          extensions: [
            ...extensions,
            unifiedMergeView({
              original: props.doc,
            }),
            EditorView.updateListener.of((update) => {
              if (!originalDocument()) {
                setOriginalDocument(getOriginalDoc(update.state));
              }

              if (update.transactions.length > 0) {
                for (const transaction of update.transactions) {
                  const isChunkDecision = transaction.isUserEvent('accept') || transaction.isUserEvent('accept');
                  const chunkDecision = transaction.isUserEvent('accept')
                    ? CodeEditorChunkDecision.ACCEPT
                    : CodeEditorChunkDecision.REVERT;

                  if (isChunkDecision) {
                    const chunksAfter = getChunks(update.state);

                    if (chunksAfter) {
                      const previousChunks = getChunks(update.startState);

                      if (previousChunks) {
                        const justAcceptedChunks = findModifiedChunks(previousChunks.chunks, chunksAfter.chunks);

                        if (justAcceptedChunks.length > 0) {
                          const acceptedChunk = justAcceptedChunks[0];

                          const chunkContent = update.state.doc.sliceString(acceptedChunk.fromB, acceptedChunk.toB);

                          setAcceptedChunks([
                            ...acceptedChunks(),
                            {
                              fromA: acceptedChunk.fromA,
                              toA: acceptedChunk.toA,
                              fromB: acceptedChunk.fromB,
                              toB: acceptedChunk.toB,
                              content: chunkContent,
                            },
                          ]);
                        }
                      }

                      const documentWithOnlyAcceptedChunks = buildDocumentWithAcceptedChunks(
                        originalDocument() as Text,
                        acceptedChunks(),
                      );

                      props.onChunkDecision?.(chunkDecision, documentWithOnlyAcceptedChunks);
                    }
                  }
                }
              }
            }),
          ],
        }),
      );

      return;
    }

    setMergeView(
      new MergeView({
        a: {
          doc: props.doc,
          extensions,
        },
        b: {
          doc: props.suggestedDoc,
          extensions: [...extensions, EditorView.editable.of(false), EditorState.readOnly.of(true)],
        },
        parent: containerElement,
      }),
    );
  });

  return (
    // needed to make sure the containing editor works with scroll areas
    <div class="relative">
      <div
        {...restOfProps}
        class={tailwindUtils.merge(styles.codeEditor, props.class, {
          [styles.borderless]: props.isBorderless,
        })}
        ref={containerElement}
      />
    </div>
  );
};

export default CodeEditor;
