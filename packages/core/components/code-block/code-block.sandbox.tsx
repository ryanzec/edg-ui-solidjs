import CodeBlock, { CodeBlockVariant } from '$/core/components/code-block';
import styles from '$/core/components/code-block/code-block.sandbox.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/CodeBlock',
};

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <div>Block</div>
      <div class={styles.smallWidth}>
        some
        <CodeBlock code="PowerShell -ExecutionPolicy Bypass -File C\Users\Public\akira_disguise.ps1" />
        text
      </div>
      <div>Inline</div>
      <div class={styles.smallWidth}>
        This is an example of an inline code block: <CodeBlock variant={CodeBlockVariant.INLINE} code="PowerShell" />{' '}
        command. This is an example of an inline code block:{' '}
        <CodeBlock variant={CodeBlockVariant.INLINE} code="PowerShell" /> command.
      </div>
    </SandboxExamplesContainer>
  );
};

export const Copy = () => {
  return (
    <SandboxExamplesContainer>
      <div>Block</div>
      <div class={styles.smallWidth}>
        some
        <CodeBlock code="PowerShell -ExecutionPolicy Bypass -File C\Users\Public\akira_disguise.ps1" showCopyButton />
        text
      </div>
      <div>Inline</div>
      <div class={styles.smallWidth}>
        This is an example of an inline code block:{' '}
        <CodeBlock variant={CodeBlockVariant.INLINE} code="PowerShell" showCopyButton /> command. This is an example of
        an inline code block: <CodeBlock variant={CodeBlockVariant.INLINE} code="PowerShell" showCopyButton /> command.
      </div>
    </SandboxExamplesContainer>
  );
};

export const Ellipsis = () => {
  let code = 'PowerShell -ExecutionPolicy Bypass -File C\Users\Public\akira_disguise.ps1';

  for (let i = 0; i < 4; i++) {
    code += code;
  }

  return (
    <SandboxExamplesContainer>
      <div>Ellipsis</div>
      <div class={styles.smallWidth}>
        <CodeBlock ellipsis code={code} showCopyButton />
      </div>
      <div>No Ellipsis</div>
      <div class={styles.smallWidth}>
        <CodeBlock code={code} showCopyButton />
      </div>
    </SandboxExamplesContainer>
  );
};

export const Scrolling = () => {
  let code = 'PowerShell -ExecutionPolicy Bypass -File C\Users\Public\akira_disguise.ps1';

  for (let i = 0; i < 4; i++) {
    code += code;
  }

  return (
    <SandboxExamplesContainer>
      <div class={tailwindUtils.merge(styles.smallWidth, 'max-h-[200px] flex flex-col')}>
        <CodeBlock code={code} showCopyButton />
      </div>
    </SandboxExamplesContainer>
  );
};
