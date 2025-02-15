import Avatar from '$/core/components/avatar';
import Icon from '$/core/components/icon';
import List from '$/core/components/list/index';
import styles from '$/core/components/list/list.sandbox.module.css';

export default {
  title: 'Components/List',
};

const normalSupportText =
  'Supporting text that is long in order to make sure the ellipis works properly when the width of the list item in not long enough and configured to ellipsis the text';

export const ListItem = () => {
  return (
    <>
      <List class={styles.listContainer}>
        <List.Item preItem={<Avatar>SJ</Avatar>}>Item 1</List.Item>
        <List.Item preItem={<Icon icon="check" />}>Item 2</List.Item>
        <List.Item isSelected>Selected Item</List.Item>
      </List>
    </>
  );
};
