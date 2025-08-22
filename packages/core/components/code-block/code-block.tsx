import { mergeProps, Show, splitProps } from 'solid-js';
import styles from '$/core/components/code-block/code-block.module.css';
import CopyText from '$/core/components/copy-text';
import { ScrollArea } from '$/core/components/scroll-area';
import Typography, { type TypographyProps, TypographySize, type TypographyVariant } from '$/core/components/typography';
import { tailwindUtils } from '$/core/utils/tailwind';
import EllipsisText from '../ellipsis-text';

export const CodeBlockVariant = {
  BLOCK: 'block',
  INLINE: 'inline',
} as const;

export type CodeBlockVariant = (typeof CodeBlockVariant)[keyof typeof CodeBlockVariant];

export type CodeBlockProps = Omit<TypographyProps, 'variant'> & {
  code: string;
  variant?: CodeBlockVariant;
  typographyVariant?: TypographyVariant;
  showCopyButton?: boolean;
  ellipsis?: boolean;
};

const CodeBlock = (passedProps: CodeBlockProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ variant: CodeBlockVariant.BLOCK }, passedProps), [
    'code',
    'variant',
    'typographyVariant',
    'class',
    'showCopyButton',
    'ellipsis',
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
      class={tailwindUtils.merge(
        'h-full',
        styles.codeBlock,
        {
          [styles.inline]: props.variant === CodeBlockVariant.INLINE,
        },
        props.class,
      )}
      variant={props.typographyVariant}
    >
      <ScrollArea class="h-full" overlapContent={false}>
        <Show when={props.ellipsis} fallback={props.code}>
          <EllipsisText class="line-clamp-[10]" text={props.code} />
        </Show>
        <Show when={props.showCopyButton}>
          {/* needs to make sure the tooltip shows properly */}
          {/* @todo(research) better way to handle this */}
          <div class={styles.copyButton}>
            <CopyText text={props.code} />
          </div>
        </Show>
      </ScrollArea>
    </Typography>
  );
};

export default CodeBlock;
