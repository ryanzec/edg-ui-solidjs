import styles from '$/core/components/code-editor/code-editor.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';
import { EditorState, type Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import classnames from 'classnames';
import { basicSetup } from 'codemirror';
import { type JSX, createSignal, mergeProps, onMount, splitProps } from 'solid-js';

export type CodeEditorProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    // some of these name don't match standard convention however I think it is better to have these props match
    // codemirror properties when possible to make it easier to use
    doc: string;
    extensions?: Extension[];
  };

const defaultProps: Partial<CodeEditorProps> = {};

const CodeEditor = (passedProps: CodeEditorProps) => {
  let containerElement: HTMLDivElement | undefined;

  const [props, restOfProps] = splitProps(mergeProps(defaultProps, passedProps), ['class', 'doc', 'extensions']);
  const [editorView, setEditorView] = createSignal<EditorView>();

  onMount(() => {
    setEditorView(
      new EditorView({
        parent: containerElement,
        state: EditorState.create({
          doc: props.doc,
          extensions: [
            basicSetup,
            EditorView.theme({
              '&': {
                height: '100%',
                width: '100%',
              },
              '.cm-scroller': {
                height: '100%',
              },
            }),
            ...(props.extensions || []),
          ],
        }),
      }),
    );
  });

  return <div {...restOfProps} class={classnames(styles.codeEditor, props.class)} ref={containerElement} />;
};

export default CodeEditor;
