import DatePicker, { type DatePickerProps } from '$/core/components/date-picker/date-picker';
import Input, { type DatePickerInputProps, type WhichDate } from '$/core/components/date-picker/date-picker-input';

export type { DatePickerProps, DatePickerInputProps, WhichDate };

export { datePickerComponentUtils } from '$/core/components/date-picker/utils';
export type {
  DatePickerInputValueStore,
  DatePickerInputDateStore,
  DateFormValue,
} from '$/core/components/date-picker/utils';

export default Object.assign(DatePicker, { Input });
