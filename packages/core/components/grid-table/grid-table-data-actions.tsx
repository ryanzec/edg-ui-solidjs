import DropDown from '$/core/components/drop-down';
import GridTableData, { type GridTableDataProps } from '$/core/components/grid-table/grid-table-data';
import { Icon } from '$/core/components/icon';
import type { TooltipStore } from '$/core/components/tooltip';
import { type JSX, splitProps } from 'solid-js';

export type GridTableDataActionsProps = GridTableDataProps & {
  dropDownContentElement: JSX.Element;
  actionsTooltipStore: TooltipStore;
};

const GridTableDataActions = (passedProps: GridTableDataActionsProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['dropDownContentElement', 'actionsTooltipStore']);

  const handleClick = (event: MouseEvent) => {
    // since the table row it self can be clickable, we need to stop the event from bubbling up to the row
    event.stopPropagation();
  };

  return (
    <GridTableData onClick={handleClick} {...restOfProps}>
      <DropDown.Menu
        tooltipStore={props.actionsTooltipStore}
        handleElement={<Icon class="cursor-pointer" icon="dots-three" />}
        contentElement={props.dropDownContentElement}
      />
    </GridTableData>
  );
};

export default GridTableDataActions;
