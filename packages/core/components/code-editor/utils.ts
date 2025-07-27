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
import { type LintSource, lintKeymap } from '@codemirror/lint';
import { search, searchKeymap } from '@codemirror/search';
import { EditorState, type Extension, type StateEffectType, type StateField } from '@codemirror/state';
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  type EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from '@codemirror/view';

export const CodeEditorDiffType = {
  SIDE_BY_SIDE: 'side-by-side',
  UNIFIED: 'unified',
} as const;

export type CodeEditorDiffType = (typeof CodeEditorDiffType)[keyof typeof CodeEditorDiffType];

export const CodeEditorChunkDecision = {
  ACCEPT: 'accept',
  REVERT: 'revert',
} as const;

export type CodeEditorChunkDecision = (typeof CodeEditorChunkDecision)[keyof typeof CodeEditorChunkDecision];

export type CodeEditorLanguageConfiguration = {
  extension: Extension;
  linter?: LintSource;
};

export type CodeEditorStateBasedExtension<TStateData> = {
  effect: StateEffectType<TStateData>;
  field: StateField<TStateData>;
  updateState: (editorView: EditorView, errorMessages?: TStateData) => void;
};

// since the basicSetup that codemirror provides is not configurable by design, in order to remove one
// extension that I don't think makes sense by default, we need to recreate basicSetup minus that extension
export const defaultExtensions: Extension[] = [
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
