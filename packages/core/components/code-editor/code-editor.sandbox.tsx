import CodeEditor, { type CodeEditorLanguageConfiguration, yamlLinter } from '$/core/components/code-editor';
import styles from '$/core/components/code-editor/code-editor.sandbox.module.css';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
import { yaml } from '@codemirror/lang-yaml';

export default {
  title: 'Components/CodeEditor',
};

const yamlContent = `test: "test"
array:
  - test
  - test2  
`;

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <CodeEditor class={styles.codeEditor} doc="Content" />
    </SandboxExamplesContainer>
  );
};

export const LanguageYaml = () => {
  const language: CodeEditorLanguageConfiguration = {
    extension: yaml(),
  };

  return (
    <SandboxExamplesContainer>
      <CodeEditor class={styles.codeEditor} doc={yamlContent} language={language} />
    </SandboxExamplesContainer>
  );
};

export const LanguageYamlLinting = () => {
  const language: CodeEditorLanguageConfiguration = {
    extension: yaml(),
    linter: yamlLinter,
  };

  return (
    <SandboxExamplesContainer>
      <CodeEditor class={styles.codeEditor} doc={yamlContent} language={language} />
    </SandboxExamplesContainer>
  );
};

export const ReadOnly = () => {
  const language: CodeEditorLanguageConfiguration = {
    extension: yaml(),
    linter: yamlLinter,
  };

  return (
    <SandboxExamplesContainer>
      <CodeEditor class={styles.codeEditor} doc={yamlContent} language={language} readonly />
    </SandboxExamplesContainer>
  );
};
