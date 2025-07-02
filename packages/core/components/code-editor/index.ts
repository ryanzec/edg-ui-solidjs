import { default as BaseCodeEditor, type CodeEditorProps } from '$/core/components/code-editor/code-editor';
import Diff, { type CodeEditorDiffProps } from '$/core/components/code-editor/code-editor-diff';

export { yamlLinter } from '$/core/components/code-editor/linters/yaml-linter';

export type {
  CodeEditorStateBasedExtension,
  CodeEditorLanguageConfiguration,
} from '$/core/components/code-editor/utils';
export {
  CodeEditorDiffType,
  CodeEditorChunkDecision,
} from '$/core/components/code-editor/utils';

export type { CodeEditorProps, CodeEditorDiffProps };

export const CodeEditor = Object.assign(BaseCodeEditor, { Diff });

export default CodeEditor;
