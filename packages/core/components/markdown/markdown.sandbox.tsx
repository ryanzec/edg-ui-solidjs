import Markdown from '$/core/components/markdown';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Markdown',
};

const SIMPLE_MARKDOWN = `# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

This is a simple markdown example with **bold** and *italic* text.

## Lists

### Unordered List
- Item 1
- Item 2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## Links
[Visit Google](https://google.com)

## Blockquote

> This is a blockquote.
> It can span multiple lines.

## Code

Inline \`code\` example.

\`\`\`
function example() {
  return "Hello, world!";
}
\`\`\`
`;

const ERROR_MARKDOWN = '# This should show an error';

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <Markdown markdown={SIMPLE_MARKDOWN} />
    </SandboxExamplesContainer>
  );
};
