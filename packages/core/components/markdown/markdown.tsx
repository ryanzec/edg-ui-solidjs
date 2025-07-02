import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import { createMemo } from 'solid-js';

const markdown = new Remarkable('full', {
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkTarget: '',
  typographer: false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',
}).use(linkify);

import styles from '$/core/components/markdown/markdown.module.css';

export type MarkdownProps = {
  markdown: string;
};

const Markdown = (props: MarkdownProps) => {
  const processedContent = createMemo<string>(() => {
    return markdown.render(props.markdown);
  });

  return <div data-id="markdown" class={styles.markdownContent} innerHTML={processedContent()} />;
};

export default Markdown;
