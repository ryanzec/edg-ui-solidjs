import { createEffect, splitProps } from 'solid-js';
import Checkbox from '$/core/components/checkbox';
import FormField from '$/core/components/form-field';
import GridTableData, { type GridTableDataProps } from './grid-table-data';

export type GridTableRowSelectorProps<TRowData> = Omit<GridTableDataProps, 'onChange'> & {
  onChange: (checked: boolean, item: TRowData) => void;
  item: TRowData;
  isSelected: boolean;
  disabled?: boolean;
};

const GridTableRowSelector = <TRowData,>(passedProps: GridTableRowSelectorProps<TRowData>) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'onChange', 'item', 'isSelected', 'disabled']);

  const handleChange = (event: Event) => {
    const checkbox = event.target as HTMLInputElement;

    props.onChange?.(checkbox.checked, props.item);
  };

  return (
    <GridTableData {...restOfProps}>
      <FormField>
        <Checkbox onChange={handleChange} checked={props.isSelected} disabled={props.disabled} />
      </FormField>
    </GridTableData>
  );
};

export default GridTableRowSelector;
