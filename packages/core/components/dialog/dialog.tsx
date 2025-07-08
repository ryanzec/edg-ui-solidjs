import styles from '$/core/components/dialog/dialog.module.css';
import { type DialogComponentApi, DialogFooterAlignment } from '$/core/components/dialog/utils';
import Icon from '$/core/components/icon';
import Overlay from '$/core/components/overlay';
import Typography, { TypographySize } from '$/core/components/typography';
import { Key } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, createSignal, mergeProps, onCleanup, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

export type DialogProps = JSX.HTMLAttributes<HTMLDivElement> & {
  onReady?: (componentApi: DialogComponentApi) => void;
  onCleanup?: () => void;
  headerElement?: JSX.Element;
  footerElement?: JSX.Element;
  footerAlignment?: DialogFooterAlignment;
  closeOnClickOverlay?: boolean;
  closeOnEscape?: boolean;
  closeEnabled?: boolean;
};

export const defaultDialogProps: Partial<DialogProps> = {
  footerAlignment: DialogFooterAlignment.RIGHT,
  closeOnClickOverlay: false,
  closeOnEscape: true,
  closeEnabled: true,
};

const Dialog = (passedProps: DialogProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultDialogProps, passedProps), [
    'children',
    'class',
    'headerElement',
    'footerElement',
    'footerAlignment',
    'closeOnClickOverlay',
    'closeOnEscape',
    'closeEnabled',
    'onCleanup',
    'onReady',
  ]);

  const [isOpened, setIsOpened] = createSignal<boolean>(false);

  const open = () => {
    setIsOpened(true);
  };

  const close = () => {
    setIsOpened(false);
  };

  const toggle = () => {
    setIsOpened(!isOpened());
  };

  const dialogElementRef = () => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (props.closeEnabled === false || props.closeOnEscape === false || event.key !== Key.ESCAPE) {
        return;
      }

      close();
    };

    document.addEventListener('keydown', keyDownListener);

    onCleanup(() => {
      document.removeEventListener('keydown', keyDownListener);
    });
  };

  const handleClickOverlay = () => {
    if (props.closeEnabled === false || props.closeOnClickOverlay === false) {
      return;
    }

    close();
  };

  const handleCloseDialog = () => {
    if (props.closeEnabled === false) {
      return;
    }

    close();
  };

  props.onReady?.({
    isOpened,
    open,
    close,
    toggle,
  });

  onCleanup(() => {
    props.onCleanup?.();
  });

  return (
    <Show when={isOpened()}>
      <Portal>
        <div
          ref={dialogElementRef}
          data-id="dialog"
          {...restOfProps}
          class={tailwindUtils.merge(styles.dialog, props.class)}
        >
          <Typography size={TypographySize.EXTRA_LARGE} class={styles.dialogHeader}>
            {props.headerElement}
            <Icon class={styles.closeHeaderTrigger} icon="x" onClick={handleCloseDialog} />
          </Typography>
          <div class={styles.dialogContent}>{props.children}</div>
          <Show when={props.footerElement}>
            <div
              class={tailwindUtils.merge(styles.dialogFooter, {
                [styles.dialogFooterRightAligned]: props.footerAlignment,
              })}
            >
              {props.footerElement}
            </div>
          </Show>
        </div>
      </Portal>
      <Overlay onClick={handleClickOverlay} />
    </Show>
  );
};

export default Dialog;
