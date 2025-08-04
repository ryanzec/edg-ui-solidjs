import dayjs, { type Dayjs } from 'dayjs';
import { createEffect, createSignal, Show } from 'solid-js';
import * as zod from 'zod';
import Button from '$/core/components/button';
import DatePicker from '$/core/components/date-picker';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import { dateStoreUtils, type WhichDate } from '$/core/stores/date.store';
import { formStoreUtils } from '$/core/stores/form.store';
import { DateTimeFormat } from '$/core/utils/date';
import { validationUtils } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';

export default {
  title: 'Components/DatePicker',
};

export const Default = () => {
  const [lastSelectedDate, setLastSelectedDate] = createSignal<Dayjs>();

  const onSelectDate = (selectedDate?: Dayjs) => {
    setLastSelectedDate(selectedDate);
  };

  const formattedSelectedDate = () => {
    const currentSelectedDate = lastSelectedDate();

    if (!currentSelectedDate) {
      return '';
    }

    return dayjs(currentSelectedDate).format(DateTimeFormat.STANDARD_DATE_TIME);
  };

  return (
    <>
      <div>
        <div>Default</div>
        <DatePicker onSelectDate={onSelectDate} />
      </div>
      <div>
        <div>With default selected value</div>
        <DatePicker onSelectDate={onSelectDate} defaultSelectedDate={dayjs('Nov 1 2022')} />
      </div>
      <div>
        <div>With default selected value and display date not the same</div>
        <DatePicker
          onSelectDate={onSelectDate}
          defaultSelectedDate={dayjs('Nov 1 2022')}
          defaultDisplayDate={dayjs('Dec 1 2022')}
        />
      </div>
      <div>
        <div>With time</div>
        <DatePicker includeTime onSelectDate={onSelectDate} defaultSelectedDate={dayjs('Nov 1 2022 3:34 pm')} />
      </div>
      <div>
        <div>Explicitly pass current date</div>
        <DatePicker defaultDisplayDate={dayjs('Nov 1 2022')} onSelectDate={onSelectDate} />
      </div>
      <div>
        <div>disable before date</div>
        <DatePicker
          onSelectDate={onSelectDate}
          defaultDisplayDate={dayjs('Nov 1 2022')}
          disableBefore={dayjs('Nov 10 2022')}
        />
      </div>
      <div>
        <div>disable after date</div>
        <DatePicker
          onSelectDate={onSelectDate}
          defaultDisplayDate={dayjs('Nov 1 2022')}
          disableAfter={dayjs('Nov 20 2022')}
        />
      </div>
      <div>
        <div>with footer</div>
        <DatePicker onSelectDate={onSelectDate} includeFooter />
      </div>
      <div>
        <div>with done callback</div>
        <DatePicker onSelectDate={onSelectDate} includeFooter onDone={() => console.log('done called')} />
      </div>
      <Show when={lastSelectedDate()}>
        <div>({formattedSelectedDate()})</div>
      </Show>
    </>
  );
};

export const Input = () => {
  return (
    <>
      <div>
        <div>default</div>
        <DatePicker.Input />
      </div>
      <div>
        <div>include time</div>
        <DatePicker.Input includeTime />
      </div>
      <div>
        <div>range</div>
        <DatePicker.Input includeTime isRange />
      </div>
      <div>
        <div>with default display date</div>
        <DatePicker.Input includeTime defaultStartDisplayDate={dayjs('Nov 1 2022')} />
      </div>
      <div>
        <div>with default selected date</div>
        <DatePicker.Input includeTime defaultStartSelectedDate={dayjs('Nov 1 2022 12:23 pm')} />
      </div>
      <div>
        <div>range with default display dates</div>
        <DatePicker.Input
          includeTime
          isRange
          defaultStartDisplayDate={dayjs('Nov 1 2022')}
          defaultEndDisplayDate={dayjs('Dec 1 2022')}
        />
      </div>
      <div>
        <div>range with default selected dates</div>
        <DatePicker.Input
          includeTime
          isRange
          defaultStartSelectedDate={dayjs('Nov 1 2022 12:23 pm')}
          defaultEndSelectedDate={dayjs('Dec 11 2022 4:34 pm')}
        />
      </div>
      <div>
        <div>disabled</div>
        <DatePicker.Input
          includeTime
          isRange
          disabled
          defaultStartSelectedDate={dayjs('Nov 1 2022 12:23 pm')}
          defaultEndSelectedDate={dayjs('Dec 11 2022 4:34 pm')}
        />
      </div>
    </>
  );
};

type FormData = {
  dateRange: string[];
};

export const Form = () => {
  const dateRangeStore = dateStoreUtils.createDateRangeStore();

  const formDataSchema = zodUtils.schemaForType<FormData>()(
    zod.object({
      dateRange: zod.custom<string[]>(
        (value: string[]) => {
          console.log(value);
          return validationUtils.isValidDateRange(value);
        },
        {
          message: 'Invalid date range',
        },
      ),
    }),
  );

  const formStore = formStoreUtils.createStore<FormData>({
    schema: formDataSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const formDirective = formStore.formDirective;

  createEffect(() => {
    console.log(dateRangeStore.startDate());
    console.log(dateRangeStore.endDate());
  });

  return (
    <>
      <form use:formDirective>
        <FormFields>
          <FormField errors={formStore.errors().dateRange?.errors}>
            <DatePicker.Input
              isRange
              name="dateRange"
              formData={formStore.data}
              onSelectDate={(data: Dayjs | undefined, which?: WhichDate) => {
                dateRangeStore.setDate(data, which);

                formStore.setValue('dateRange', dateRangeStore.getFormValue(), {
                  markAsTouched: false,
                });
              }}
            />
          </FormField>
          <Button type="submit">Submit</Button>
        </FormFields>
      </form>
      <div data-id="form-data">{JSON.stringify(formStore.data)}</div>
    </>
  );
};

export const LimitedRangeFromSelection = () => {
  const dateRangeStore = dateStoreUtils.createDateRangeStore();

  const formDataSchema = zodUtils.schemaForType<FormData>()(
    zod.object({
      dateRange: zod.custom<string[]>(
        (value: string[]) => {
          console.log(value);
          return validationUtils.isValidDateRange(value);
        },
        {
          message: 'Invalid date range',
        },
      ),
    }),
  );

  const formStore = formStoreUtils.createStore<FormData>({
    schema: formDataSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const formDirective = formStore.formDirective;

  createEffect(() => {
    console.log(dateRangeStore.startDate());
    console.log(dateRangeStore.endDate());
  });

  return (
    <>
      <form use:formDirective>
        <FormFields>
          <FormField errors={formStore.errors().dateRange?.errors}>
            <DatePicker.Input
              isRange
              name="dateRange"
              formData={formStore.data}
              // since the selected data is always available, to do 2 weeks we need to allow 13 days for the range
              allowedRange={{
                value: 13,
                type: 'day',
              }}
              onSelectDate={(data: Dayjs | undefined, which?: WhichDate) => {
                dateRangeStore.setDate(data, which);

                formStore.setValue('dateRange', dateRangeStore.getFormValue(), {
                  markAsTouched: false,
                });
              }}
            />
          </FormField>
          <Button type="submit">Submit</Button>
        </FormFields>
      </form>
      <div data-id="form-data">{JSON.stringify(formStore.data)}</div>
    </>
  );
};

// not exported as this is only for testing and would be caught in a `pnpm build:check`
const NameTypingTest = () => {
  const form = formStoreUtils.createStore<{ date: string }>({
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <FormField>
      {/* @ts-expect-error should error since it is not part of the form data, intended to test this functionality */}
      <DatePicker.Input name="dat" formData={form.data} />
    </FormField>
  );
};
