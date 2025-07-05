import { default as BaseDatePicker, type DatePickerProps } from '$/core/components/date-picker/date-picker';
import Input, { type DatePickerInputProps } from '$/core/components/date-picker/date-picker-input';

export type { DatePickerProps, DatePickerInputProps };

export { datePickerComponentUtils, WhichDate } from '$/core/components/date-picker/utils';
export type {
  InputDateRangeStore as DatePickerInputValueStore,
  InputDateStore as DatePickerInputDateStore,
  DateFormValue,
} from '$/core/components/date-picker/utils';

export const DatePicker = Object.assign(BaseDatePicker, { Input });

export default DatePicker;
