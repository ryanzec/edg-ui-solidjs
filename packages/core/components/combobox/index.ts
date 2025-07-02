import { default as BaseCombobox } from '$/core/components/combobox/combobox';
import FormattedSelectableOption from '$/core/components/combobox/formatted-selectable-option';
import SelectableOption from '$/core/components/combobox/selectable-option';
import SelectedOption from '$/core/components/combobox/selected-option';

export type {
  ComboboxOptionValue,
  ComboboxExtraData,
  ComboboxOption,
  ComboboxProps,
  ComboboxValueStore,
  ComboboxStore,
  ComboboxSelectableOptionProps,
  ComboboxSelectedOptionProps,
  GetInputPropsReturns,
  GetSelectableOptionPropsReturns,
  GetSelectedOptionPropsReturns,
} from '$/core/components/combobox/utils';

export {
  comboboxComponentUtils,
  AsyncOptionsState,
} from '$/core/components/combobox/utils';

export const Combobox = Object.assign(BaseCombobox, {
  SelectableOption,
  FormattedSelectableOption,
  SelectedOption,
});

export default Combobox;
