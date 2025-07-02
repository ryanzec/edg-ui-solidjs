import styles from '$/core/components/dialog/dialog.module.css';
import { DialogFooterAlignment, type DialogStore } from '$/core/components/dialog/utils';
import Icon from '$/core/components/icon';
import Overlay from '$/core/components/overlay';
import Typography, { TypographySize } from '$/core/components/typography';
import { Key } from '$/core/types/generic';
import classnames from 'classnames';
import { type JSX, Show, mergeProps, onCleanup, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

export type DialogProps = JSX.HTMLAttributes<HTMLDivElement> & {
  dialogStore: DialogStore;
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
    'dialogStore',
    'headerElement',
    'footerElement',
    'footerAlignment',
    'closeOnClickOverlay',
    'closeOnEscape',
    'closeEnabled',
  ]);
  const dialogRef = () => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (props.closeEnabled === false || props.closeOnEscape === false || event.key !== Key.ESCAPE) {
        return;
      }

      props.dialogStore.close();
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

    props.dialogStore.close();
  };

  const handleCloseDialog = () => {
    if (props.closeEnabled === false) {
      return;
    }

    props.dialogStore.close();
  };

  return (
    <Show when={props.dialogStore.isOpened()}>
      <Portal>
        <div ref={dialogRef} data-id="dialog" {...restOfProps} class={classnames(styles.dialog, props.class)}>
          <Typography size={TypographySize.EXTRA_LARGE} class={styles.dialogHeader}>
            {props.headerElement}
            <Icon class={styles.closeHeaderTrigger} icon="x" onClick={handleCloseDialog} />
          </Typography>
          <div class={styles.dialogContent}>{props.children}</div>
          <Show when={props.footerElement}>
            <div
              class={classnames(styles.dialogFooter, {
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
