import Combobox from '$/components/combobox/combobox';
import FormattedSelectableOption from '$/components/combobox/formatted-selectable-option';
import SelectableOption from '$/components/combobox/selectable-option';
import SelectedOption from '$/components/combobox/selected-option';

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
} from '$/components/combobox/utils';

export {
  comboboxComponentUtils,
  AsyncOptionsState,
} from '$/components/combobox/utils';

export default Object.assign(Combobox, {
  SelectableOption,
  FormattedSelectableOption,
  SelectedOption,
});
