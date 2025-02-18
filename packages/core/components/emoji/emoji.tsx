import classnames from 'classnames';
import { type JSX, mergeProps, splitProps } from 'solid-js';

// this json files was generated using this file as a base:
// https://raw.githubusercontent.com/iamcal/emoji-data/refs/heads/master/emoji.json
// and then stripping out all data expect short_name and unified with this tool:
// https://jsoneditoronline.org/
import emojis from '$/core/assets/json/emojis.json';

type EmojiJsonData = {
  short_name: string;
  unified: string;
};
import styles from '$/core/components/emoji/emoji.module.css';
import { EmojiSpacing } from '$/core/components/emoji/utils';
import { IconSize } from '$/core/components/icon';

export type EmojiProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  emoji: string | string[];
  spacing?: EmojiSpacing;
  size?: IconSize;
};

const Emoji = (passedProps: EmojiProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ size: IconSize.BASE }, passedProps), [
    'class',
    'emoji',
    'spacing',
    'size',
  ]);
  const emojisToRender = () => {
    const tempEmojis = Array.isArray(props.emoji) ? props.emoji : [props.emoji];

    return tempEmojis.map((tempEmoji) => {
      // need to trim leading trailing colons if there
      return tempEmoji.replace(/(^:|:$)/g, '');
    });
  };

  const getEmojiHtml = () => {
    return emojisToRender()
      .map((emojiToRender) => {
        if (!emojiToRender) {
          return '';
        }

        const emojiParts = emojiToRender.split('::');

        // seems like if there are multiple  part, that is for skin tones
        if (emojiParts.length > 1) {
          const t = emojiParts.map((part) => {
            return (emojis.find((emoji) => emoji.short_name === part) as EmojiJsonData)?.unified ?? '';
          });

          // for whatever reason it seem like the skin tone need to be above the main emoji unicode but before other
          // modifiers so this ensures that
          return `&#x${t[0].replace('-', t[1] ? `-${t[1]}-` : '-').replaceAll('-', '&#x')}`;
        }
        const unicode = emojis.find((emoji) => emoji.short_name === emojiToRender) as EmojiJsonData;

        if (!unicode) {
          return emojiToRender;
        }

        return `&#x${unicode.unified.replaceAll('-', '&#x')}`;
      })
      .join('');
  };

  return (
    <span
      data-id="emoji"
      role="img"
      aria-label={emojisToRender().join(' ')}
      {...restOfProps}
      class={classnames(props.class, {
        [styles.extra_small]: props.size === IconSize.EXTRA_SMALL,
        [styles.extra_small2]: props.size === IconSize.EXTRA_SMALL2,
        [styles.small]: props.size === IconSize.SMALL,
        [styles.base]: props.size === IconSize.BASE,
        [styles.large]: props.size === IconSize.LARGE,
        [styles.extra_large]: props.size === IconSize.EXTRA_LARGE,
        [styles.extra_large2]: props.size === IconSize.EXTRA_LARGE2,
        [styles.spacingLeft]: props.spacing === EmojiSpacing.LEFT || props.spacing === EmojiSpacing.BOTH,
        [styles.spacingRight]: props.spacing === EmojiSpacing.RIGHT || props.spacing === EmojiSpacing.BOTH,
      })}
      innerHTML={getEmojiHtml()}
    />
  );
};

export default Emoji;
