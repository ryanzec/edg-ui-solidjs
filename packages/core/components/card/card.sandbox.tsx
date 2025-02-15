import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import Card, { CardFooterAlignment } from '$/core/components/card/index';
import styles from '$/core/components/dialog/dialog.sandbox.module.css';
import Icon, { IconSize } from '$/core/components/icon';

export default {
  title: 'Components/Card',
};

export const Default = () => {
  return (
    <div>
      <Card class={styles.card}>content</Card>
      <Card class={styles.card} headerText="Header">
        content
      </Card>
      <Card
        class={styles.card}
        headerText="Header"
        headerPreItem={<Icon icon="question" size={IconSize.EXTRA_LARGE} />}
      >
        content
      </Card>
      <Card
        class={styles.card}
        headerText="Header"
        headerPreItem={<Icon icon="question" size={IconSize.EXTRA_LARGE} />}
        headerPostItem={
          <Button
            variant={ButtonVariant.TEXT}
            color={ButtonColor.NEUTRAL}
            class={styles.closeHeaderTrigger}
            onclick={() => console.log('post item clicked')}
            preItem={<Icon icon="x" />}
          />
        }
      >
        content
      </Card>
      <Card
        class={styles.card}
        headerText="Header"
        headerPreItem={<Icon icon="question" size={IconSize.EXTRA_LARGE} />}
        headerPostItem={
          <Button
            variant={ButtonVariant.TEXT}
            color={ButtonColor.NEUTRAL}
            class={styles.closeHeaderTrigger}
            onclick={() => console.log('post item clicked')}
            preItem={<Icon icon="x" />}
          />
        }
        footerElement={
          <Button.Group>
            <Button color={ButtonColor.BRAND}>Action 1</Button>
            <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.WEAK}>
              Action 2
            </Button>
          </Button.Group>
        }
      >
        content
      </Card>
      <Card
        class={styles.card}
        headerText="Header"
        headerPreItem={<Icon icon="question" size={IconSize.EXTRA_LARGE} />}
        headerPostItem={
          <Button
            variant={ButtonVariant.TEXT}
            color={ButtonColor.NEUTRAL}
            class={styles.closeHeaderTrigger}
            onclick={() => console.log('post item clicked')}
            preItem={<Icon icon="x" />}
          />
        }
        footerAlignment={CardFooterAlignment.LEFT}
        footerElement={
          <Button.Group>
            <Button color={ButtonColor.BRAND}>Action 1</Button>
            <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.WEAK}>
              Action 2
            </Button>
          </Button.Group>
        }
      >
        content
      </Card>
      <Card
        class={styles.card}
        headerText="No content"
        headerPreItem={<Icon icon="question" size={IconSize.EXTRA_LARGE} />}
        headerPostItem={
          <Button
            variant={ButtonVariant.TEXT}
            color={ButtonColor.NEUTRAL}
            class={styles.closeHeaderTrigger}
            onclick={() => console.log('post item clicked')}
            preItem={<Icon icon="x" />}
          />
        }
      />
    </div>
  );
};
