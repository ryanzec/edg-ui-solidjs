import styles from '$/core/components/code-editor/code-editor.module.css';
import type { CodeEditorStateBasedExtension } from '$/core/components/code-editor/utils';
import { StateEffect, StateField } from '@codemirror/state';
import { type EditorView, showPanel } from '@codemirror/view';

export const buildErrorPanelExtension = (): CodeEditorStateBasedExtension<string[]> => {
  const effect = StateEffect.define<string[]>();

  const createPanel = (errorMessages: string[]) => () => {
    const dom = document.createElement('div');

    for (const message of errorMessages) {
      const contentElement = document.createElement('div');

      contentElement.textContent = message;

      dom.append(contentElement);
    }

    dom.className = styles.errorMessages;

    return { top: true, dom };
  };

  const field = StateField.define<string[]>({
    create: () => [],
    update(value, transaction) {
      let newValue = value;

      for (const transactionEffect of transaction.effects) {
        if (transactionEffect.is(effect)) {
          newValue = transactionEffect.value;
        }
      }

      return newValue;
    },
    provide: (stateField) => {
      return showPanel.from(stateField, (stateValue) => {
        return stateValue.length > 0 ? createPanel(stateValue) : null;
      });
    },
  });

  const updateState = (editorView: EditorView, errorMessages: string[] = []) => {
    editorView.dispatch({
      effects: effect.of(errorMessages),
    });
  };

  return {
    effect,
    field,
    updateState,
  };
};
