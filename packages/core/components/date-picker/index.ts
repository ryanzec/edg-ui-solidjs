import { default as BaseDatePicker, type DatePickerProps } from '$/core/components/date-picker/date-picker';
import Input, { type DatePickerInputProps } from '$/core/components/date-picker/date-picker-input';

export type { DatePickerProps, DatePickerInputProps };

export const DatePicker = Object.assign(BaseDatePicker, { Input });

export default DatePicker;
