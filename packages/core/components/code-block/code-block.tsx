import styles from '$/core/components/code-block/code-block.module.css';
import CopyText from '$/core/components/copy-text';
import Typography, { type TypographyProps, TypographySize } from '$/core/components/typography';
import { tailwindUtils } from '$/core/utils/tailwind';
import { mergeProps, splitProps } from 'solid-js';

export const CodeBlockVariant = {
  BLOCK: 'block',
  INLINE: 'inline',
} as const;

export type CodeBlockVariant = (typeof CodeBlockVariant)[keyof typeof CodeBlockVariant];

export type CodeBlockProps = TypographyProps & {
  code: string;
  variant?: CodeBlockVariant;
  showCopyButton?: boolean;
};

const CodeBlock = (passedProps: CodeBlockProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ variant: CodeBlockVariant.BLOCK }, passedProps), [
    'code',
    'variant',
    'class',
    'showCopyButton',
  ]);

  // @todo(?) not sure if we need this but if we want to do like word breaks on special characters like `/` or `\`
  // @todo(?) we will need to do something like this:
  // function addBreakOpportunities(element) {
  //    element.innerHTML = element.innerHTML
  //      .replace(/\//g, '/<span style="font-size:0">\u200B</span>')
  //      .replace(/\\/g, '\\<span style="font-size:0">\u200B</span>');
  // }
  return (
    <Typography
      data-id="code-block"
      {...restOfProps}
      size={TypographySize.SMALL}
      class={tailwindUtils.merge(styles.codeBlock, {
        [styles.inline]: props.variant === CodeBlockVariant.INLINE,
      })}
    >
      {props.code}
      {props.showCopyButton && <CopyText class={styles.copyButton} text={props.code} />}
    </Typography>
  );
};

export default CodeBlock;
