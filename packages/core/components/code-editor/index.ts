import CodeEditor, { type CodeEditorProps } from '$/core/components/code-editor/code-editor';

export { yamlLinter } from '$/core/components/code-editor/linters/yaml-linter';

export type {
  CodeEditorStateBasedExtension,
  CodeEditorLanguageConfiguration,
} from '$/core/components/code-editor/utils';

export type { CodeEditorProps };

export default CodeEditor;
