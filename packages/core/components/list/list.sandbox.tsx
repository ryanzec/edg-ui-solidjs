import Avatar from '$/core/components/avatar';
import Icon from '$/core/components/icon';
import List from '$/core/components/list';
import styles from '$/core/components/list/list.sandbox.module.css';

export default {
  title: 'Components/List',
};

const normalSupportText =
  'Supporting text that is long in order to make sure the ellipis works properly when the width of the list item in not long enough and configured to ellipsis the text';

export const ListItem = () => {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <>
      <List class={styles.listContainer}>
        <List.Item preElement={<Avatar>SJ</Avatar>}>Item 1</List.Item>
        <List.Item isEndOfSection>End of section</List.Item>
        <List.Item preElement={<Icon icon="check" />}>Item 2</List.Item>
        <List.Item isSelected>Selected Item</List.Item>
        <List.Item onClick={handleClick}>Has click handler</List.Item>
        <List.Item isClickable>Marked as clickable</List.Item>
      </List>
    </>
  );
};
