import { default as BaseCodeEditor, type CodeEditorProps } from '$/core/components/code-editor/code-editor';
import Diff, {
  type CodeEditorChunkDecisionResult,
  type CodeEditorDiffProps,
} from '$/core/components/code-editor/code-editor-diff';

export { yamlLinter } from '$/core/components/code-editor/linters/yaml-linter';

export type {
  CodeEditorLanguageConfiguration,
  CodeEditorStateBasedExtension,
} from '$/core/components/code-editor/utils';
export {
  CodeEditorChunkDecision,
  CodeEditorDiffType,
} from '$/core/components/code-editor/utils';

export type { CodeEditorProps, CodeEditorDiffProps, CodeEditorChunkDecisionResult };

export const CodeEditor = Object.assign(BaseCodeEditor, { Diff });

export default CodeEditor;
