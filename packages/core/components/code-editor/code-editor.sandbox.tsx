import Button from '$/core/components/button';
import CodeEditor, { type CodeEditorLanguageConfiguration, yamlLinter } from '$/core/components/code-editor';
import styles from '$/core/components/code-editor/code-editor.sandbox.module.css';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
import { yaml } from '@codemirror/lang-yaml';
import { createSignal } from 'solid-js';

export default {
  title: 'Components/CodeEditor',
};

const yamlContent = `test: "test"
array:
  - test
  - test2  
`;

let largeYamlContent = '';

for (let i = 0; i < 200000; i++) {
  largeYamlContent += yamlContent;
}

export const Default = () => {
  return (
    <SandboxExamplesContainer class={styles.codeEditor}>
      <CodeEditor doc="Content" />
    </SandboxExamplesContainer>
  );
};

export const LanguageYaml = () => {
  const language: CodeEditorLanguageConfiguration = {
    extension: yaml(),
  };

  return (
    <SandboxExamplesContainer class={styles.codeEditor}>
      <CodeEditor doc={yamlContent} language={language} />
    </SandboxExamplesContainer>
  );
};

export const LanguageYamlLinting = () => {
  const language: CodeEditorLanguageConfiguration = {
    extension: yaml(),
    linter: yamlLinter,
  };

  return (
    <SandboxExamplesContainer class={styles.codeEditor}>
      <CodeEditor doc={yamlContent} language={language} />
    </SandboxExamplesContainer>
  );
};

export const ReadOnly = () => {
  const language: CodeEditorLanguageConfiguration = {
    extension: yaml(),
    linter: yamlLinter,
  };

  return (
    <SandboxExamplesContainer class={styles.codeEditor}>
      <CodeEditor doc={yamlContent} language={language} readonly />
    </SandboxExamplesContainer>
  );
};

export const LargeContent = () => {
  const language: CodeEditorLanguageConfiguration = {
    extension: yaml(),
  };

  return (
    <div class={styles.container}>
      With larger content, it seems like syntax highlighting will break when moving around the document quickly
      <SandboxExamplesContainer class={styles.codeEditor}>
        <CodeEditor doc={largeYamlContent} language={language} />
      </SandboxExamplesContainer>
    </div>
  );
};

export const ErrorMessage = () => {
  const language: CodeEditorLanguageConfiguration = {
    extension: yaml(),
  };
  const [errorMessages, setErrorMessages] = createSignal<string[]>([]);

  const toggleErrorMessages = () => {
    setErrorMessages((messages) => {
      if (messages.length === 0) {
        return ['There is an error in the yaml', 'There is an another error in the yaml'];
      }

      return [];
    });
  };

  return (
    <div class={styles.container}>
      <Button class={styles.toggleErrorTrigger} onClick={toggleErrorMessages}>
        Toggle Errors
      </Button>
      <SandboxExamplesContainer class={styles.codeEditor}>
        <CodeEditor doc={yamlContent} language={language} errorMessages={errorMessages()} />
      </SandboxExamplesContainer>
    </div>
  );
};
