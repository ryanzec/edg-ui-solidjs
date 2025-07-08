import Button from '$/core/components/button';
import CodeEditor, {
  type CodeEditorChunkDecisionResult,
  CodeEditorDiffType,
  type CodeEditorLanguageConfiguration,
  yamlLinter,
} from '$/core/components/code-editor';
import styles from '$/core/components/code-editor/code-editor.sandbox.module.css';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
import { yaml } from '@codemirror/lang-yaml';
import { createSignal } from 'solid-js';

export default {
  title: 'Components/CodeEditor',
};

const yamlContent = `author: author
date: date
description: description
detection:
  condition: test
  selections:
    - selection:
        - field_name: detection selection fieldname1
          fields_values:
            - detection selection fieldname1 value1
            - detection selection fieldname1 value2
          modifier: detection modifier
        - field_name: detection selection fieldname2
          fields_values:
            - detection selection fieldname2 value1
            - detection selection fieldname2 value2
          modifier: detection selection modifier
    - selection:
        - field_name: detection selection2 field name
          fields_values:
            - detection selection2 value value
          modifier: modifier
falsepositives:
  - false1
  - false2
fields:
  - field1
  - field2
id: f4fa657c-0d4e-41ca-ae9a-ca9645294976
level: warning
license: license
logsource:
  category: log source catery
  definition: log source definition
  product: log source product
  service: log source service
modified: modified
name: name
references:
  - reference1
  - reference2
related:
  - id: related_id
    type: related_type
scope:
  - scope1
  - scope2
status: editing
tags:
  - tag1
  - tag2
taxonomy: taxonomy
title: RZ Test`;

const suggestedYamlContent = `author1: some author
author2: some author
author: some author
author3: some author
author4: some author
date: date
description: description
detection:
  condition:
  selections:
    - selection:
        - field_name: detection selection fieldname1
          fields_values:
            - detection selection fieldname1 value1
          modifier: detection modifier
        - field_name: detection selection fieldname2
          fields_values:
            - detection large changes to make sure that scrolling functionality of the editor works large changes to make sure that scrolling functionality of the editor works large changes to make sure that scrolling functionality of the editor works
            - detection selection fieldname2 value2
          modifier: detection selection modifier
    - selection:
        - field_name: detection selection2 field name
          fields_values:
            - detection selection2 value value
          modifier: modifier
falsepositives:
  - false11
  - false22
fields:3
  - field14
  - field25
id: f4fa657c-0d4e-41ca-ae9a-ca9645294976
level: warning
level2: info
license: no
level3: critical
logsource:
  category: log source catery
modified: modified
another: new line modified
name: name
references:
  - reference1
related:
  - id: related_id
    type: related_type
scope:
  - scope1
  - scope1
  - scope1
  - scope1
another2: new line
status: editing
tags:
  - tag1
  - tag2
  - tag2
  - tag2
  - tag2
  - tag2
taxonomy: taxonomy
title: RZ Test`;

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

export const Borderless = () => {
  return (
    <SandboxExamplesContainer class={styles.codeEditor}>
      <CodeEditor doc="Content" isBorderless />
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

export const DiffSideBySide = () => {
  const handleChunkDecision = (result: CodeEditorChunkDecisionResult) => {
    console.log('Side-by-side chunk', result);
  };

  return (
    <div class={styles.container}>
      <p>Side-by-side diff with Accept/Reject buttons on the right editor</p>
      <SandboxExamplesContainer class={styles.codeEditor}>
        <CodeEditor.Diff
          doc={yamlContent}
          diffType={CodeEditorDiffType.SIDE_BY_SIDE}
          suggestedDoc={suggestedYamlContent}
          onChunkDecision={handleChunkDecision}
        />
      </SandboxExamplesContainer>
    </div>
  );
};

export const DiffUnified = () => {
  const handleChunkDecision = (result: CodeEditorChunkDecisionResult) => {
    console.log('Unified chunk', result);
  };

  return (
    <div class={styles.container}>
      <p>Accept/Reject buttons appear inline next to each diff chunk. Click to accept or reject individual changes.</p>
      <SandboxExamplesContainer class={styles.codeEditor}>
        <CodeEditor.Diff
          doc={yamlContent}
          diffType={CodeEditorDiffType.UNIFIED}
          suggestedDoc={suggestedYamlContent}
          onChunkDecision={handleChunkDecision}
        />
      </SandboxExamplesContainer>
    </div>
  );
};

export const WithCopy = () => {
  const language: CodeEditorLanguageConfiguration = {
    extension: yaml(),
  };

  return (
    <SandboxExamplesContainer class={styles.codeEditor}>
      <CodeEditor doc={yamlContent} language={language} hasCopy />
    </SandboxExamplesContainer>
  );
};
