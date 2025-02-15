import CodeEditor from '$/core/components/code-editor';
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
  return (
    <SandboxExamplesContainer>
      <CodeEditor class={styles.codeEditor} doc={yamlContent} extensions={[yaml()]} />
    </SandboxExamplesContainer>
  );
};

export const ReadOnly = () => {
  return (
    <SandboxExamplesContainer>
      <CodeEditor class={styles.codeEditor} doc={yamlContent} extensions={[yaml()]} readonly />
    </SandboxExamplesContainer>
  );
};
