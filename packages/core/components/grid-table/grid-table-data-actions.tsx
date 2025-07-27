import { type JSX, splitProps } from 'solid-js';
import DropDown from '$/core/components/drop-down';
import type { DropDownMenuProps } from '$/core/components/drop-down/drop-down-menu';
import GridTableData, { type GridTableDataProps } from '$/core/components/grid-table/grid-table-data';
import { Icon } from '$/core/components/icon';

export type GridTableDataActionsProps = GridTableDataProps & {
  dropDownContentElement: JSX.Element;
  actionsDropDownComponentRef: DropDownMenuProps['tooltipComponentRef'];
};

const GridTableDataActions = (passedProps: GridTableDataActionsProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['dropDownContentElement', 'actionsDropDownComponentRef']);

  const handleClick = (event: MouseEvent) => {
    // since the table row it self can be clickable, we need to stop the event from bubbling up to the row
    event.stopPropagation();
  };

  return (
    <GridTableData onClick={handleClick} {...restOfProps}>
      <DropDown.Menu
        tooltipComponentRef={props.actionsDropDownComponentRef}
        handleElement={<Icon class="cursor-pointer" icon="dots-three" />}
        contentElement={props.dropDownContentElement}
      />
    </GridTableData>
  );
};

export default GridTableDataActions;
