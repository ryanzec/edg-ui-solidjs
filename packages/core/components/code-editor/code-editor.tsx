import styles from '$/core/components/code-editor/code-editor.module.css';
import { buildErrorPanelExtension } from '$/core/components/code-editor/extensions/error-panel';
import { type CodeEditorLanguageConfiguration, defaultExtensions } from '$/core/components/code-editor/utils';
import CopyText from '$/core/components/copy-text';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';
import { lintGutter, linter } from '@codemirror/lint';
import { EditorState, type Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { type JSX, Show, createEffect, createSignal, mergeProps, onMount, splitProps } from 'solid-js';

export type CodeEditorProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    // some of these name don't match standard convention however I think it is better to have these props match
    // codemirror properties when possible to make it easier to use
    doc: string;
    language?: CodeEditorLanguageConfiguration;
    extensions?: Extension[];
    readonly?: boolean;
    errorMessages?: string[];
    isBorderless?: boolean;
    hasCopy?: boolean;
  };

const CodeEditor = (passedProps: CodeEditorProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        doc: '',
        extensions: [],
        readonly: false,
        isBorderless: false,
        hasCopy: false,
      },
      passedProps,
    ),
    ['class', 'doc', 'extensions', 'readonly', 'language', 'errorMessages', 'isBorderless', 'hasCopy'],
  );

  let containerElement: HTMLDivElement | undefined;

  // custom extensions are broken out into their own files to keep this component as small and simple as possible
  // (also makes multiple people working on the code editor easier with less chance of conflicts)
  const errorPanelExtension = buildErrorPanelExtension();

  const [editorView, setEditorView] = createSignal<EditorView>();

  createEffect(function updateErrorPanelStateMessages() {
    const currentEditorView = editorView();

    if (!currentEditorView) {
      return;
    }

    errorPanelExtension.updateState(currentEditorView, props.errorMessages);
  });

  createEffect(function updateEditorContent() {
    const view = editorView();

    if (!view) {
      return;
    }

    const transaction = view.state.update({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: props.doc,
      },
    });

    view.dispatch(transaction);
  });

  onMount(() => {
    const extensions: Extension[] = [
      ...defaultExtensions,
      errorPanelExtension.field,
      EditorView.theme({
        '&': {
          height: '100%',
          width: '100%',
        },
        '.cm-scroller': {
          height: '100%',
        },
      }),
      EditorState.readOnly.of(props.readonly),
      EditorView.editable.of(props.readonly !== true),
      ...props.extensions,
    ];

    if (props.language) {
      extensions.push(props.language.extension);

      if (props.language.linter) {
        extensions.push(lintGutter());
        extensions.push(
          linter(props.language.linter, {
            delay: 750, // Delay in ms before running the linter
          }),
        );
      }
    }

    setEditorView(
      new EditorView({
        parent: containerElement,
        state: EditorState.create({
          doc: props.doc,
          extensions,
        }),
      }),
    );
  });

  return (
    <div class="relative group">
      <Show when={props.hasCopy}>
        <CopyText
          text={props.doc}
          copyLabel="Click to copy"
          class="absolute z-[1] top-2xs right-2xs opacity-non-hovered-overlay-item group-hover:opacity-full"
        />
      </Show>
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
