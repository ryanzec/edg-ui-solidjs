import styles from '$/core/components/code-editor/code-editor.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language';
import { type LintSource, lintGutter, lintKeymap, linter } from '@codemirror/lint';
import { search, searchKeymap } from '@codemirror/search';
import { EditorState, type Extension } from '@codemirror/state';
import {
  EditorView,
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from '@codemirror/view';
import classnames from 'classnames';
import { type JSX, createSignal, mergeProps, onMount, splitProps } from 'solid-js';

// since the basicSetup that codemirror provides is not configurable by design, it order to remove one
// extension that I don't think makes sense by default, we need to recreate basicSetup minus that extension
const defaultExtensions: Extension[] = [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  search(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
    indentWithTab,
  ]),
];

export type CodeEditorLanguageConfiguration = {
  extension: Extension;
  linter?: LintSource;
};

type SpecificProps = {
  // some of these name don't match standard convention however I think it is better to have these props match
  // codemirror properties when possible to make it easier to use
  doc: string;
  language?: CodeEditorLanguageConfiguration;
  extensions?: Extension[];
  readonly?: boolean;
};

export type CodeEditorProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes & SpecificProps;

const CodeEditor = (passedProps: CodeEditorProps) => {
  let containerElement: HTMLDivElement | undefined;

  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        doc: '',
        extensions: [],
        readonly: false,
      },
      passedProps,
    ),
    ['class', 'doc', 'extensions', 'readonly', 'language'],
  );
  const [editorView, setEditorView] = createSignal<EditorView>();

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

  return <div {...restOfProps} class={classnames(styles.codeEditor, props.class)} ref={containerElement} />;
};

export default CodeEditor;
