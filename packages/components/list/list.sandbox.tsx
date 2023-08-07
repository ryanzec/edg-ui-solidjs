import Avatar from '$/components/avatar';
import Icon from '$/components/icon';
import iconStyles from '$/components/icon/icon.module.css';
import List from '$/components/list';
import styles from '$/components/list/list.sandbox.module.css';

export default {
  title: 'Components/List',
};

const normalSupportText =
  'Supporting text that is long in order to make sure the ellipis works properly when the width of the list item in not long enough and configured to ellipsis the text';

export const ListItem = () => {
  return (
    <>
      <List class={styles.listContainer}>
        <List.Item>
          <Avatar class={styles.avatar}>SJ</Avatar>Item 1
        </List.Item>
        <List.Item>
          <Icon class={iconStyles.spacingRight} icon="check" />
          Item 2
        </List.Item>
        <List.Item isSelected>Selected Item</List.Item>
      </List>
    </>
  );
};
