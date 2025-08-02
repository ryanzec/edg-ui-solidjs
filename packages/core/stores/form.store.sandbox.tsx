import { type Accessor, createEffect, createSignal, For, Index, Match, Show, Switch } from 'solid-js';
import * as uuid from 'uuid';
import type { ZodType } from 'zod';
import * as zod from 'zod';
import Button from '$/core/components/button';
import Checkbox from '$/core/components/checkbox';
import Combobox, {
  type ComboboxOption,
  type ComboboxValueStore,
  comboboxComponentUtils,
} from '$/core/components/combobox';
import DatePicker from '$/core/components/date-picker';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import Input from '$/core/components/input';
import Label from '$/core/components/label';
import Radio from '$/core/components/radio';
import Textarea from '$/core/components/textarea';
import TimeInput, { timeInputComponentUtils } from '$/core/components/time-input';
import { type DateRangeStore, dateStoreUtils, type WhichDate } from '$/core/stores/date.store';
import { FormInputValidationState, formStoreUtils } from '$/core/stores/form.store';
import type { CommonDataType } from '$/core/types/generic';
import { ValidationMessageType, validationUtils } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';
import ExpandableCode from '$sandbox/components/expandable-code';

export default {
  title: 'Stores/Form',
};

type DeepNestedStructure = {
  partA: string;
  partB?: string;
  nested: NestStructure2[];
};

type NestStructure2 = {
  partA: string;
  partB?: string;
  partC?: string;
  partD?: string;
  partE?: string;
  partF?: string;
  partG?: string;
  partH?: string;
  partI?: string;
  partJ?: string;
};

type NestStructure = {
  partA: string;
  partB?: string;
};

type SimpleFormData = {
  title: string;
  title2?: string;
  textarea?: string;
};

const simpleFormDataSchema = zodUtils.schemaForType<SimpleFormData>()(
  zod.object({
    title: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
  }),
);

type SimpleArrayFormData = {
  array: NestStructure[];
};

const simpleArrayFormDataSchema = zodUtils.schemaForType<SimpleArrayFormData>()(
  zod.object({
    array: zod
      .object({
        partA: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
        partB: zod.string().optional(),
      })
      .array()
      .min(2, '2 Required'),
  }),
);

type NestedArrayFormData = {
  array: DeepNestedStructure[];
};

const nestedArrayFormDataSchema = zodUtils.schemaForType<NestedArrayFormData>()(
  zod.object({
    array: zod
      .object({
        partA: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
        partB: zod.string().optional(),
        nested: zod
          .object({
            partA: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
            partB: zod.string().optional(),
          })
          .array()
          .min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
      })
      .array()
      .min(2, validationUtils.getMessage(ValidationMessageType.MINIMUM_COUNT, ['2', 'items'])),
  }),
);

type DynamicFormData = {
  title: string;
  addDefaultValue: string[];
  [key: string]: CommonDataType;
};

const dynamicFormDataSchema = zodUtils.schemaForType<DynamicFormData>()(
  zod.object({
    title: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    addDefaultValue: zod.string().array().min(0),
  }),
);

const RandomFormFieldType = {
  STRING: 'string',
  NUMBER: 'number',
  CHECKBOX: 'checkbox',
  SINGLE_CHECKBOX: 'single-checkbox',
  COMBOBOX: 'comboxbox',
  RADIO: 'radio',
  CHECKBOX_TOGGLE: 'checkbox-toggle',
  SINGLE_RADIO: 'single-radio',
  TEXTAREA: 'textarea',
  DATE: 'date',
  DATE_RANGE: 'date-range',
  TIME_INPUT: 'time-input',
  ARRAY: 'array',
} as const;

type RandomFormFieldType = (typeof RandomFormFieldType)[keyof typeof RandomFormFieldType];

type RandomFormField = {
  name: string;
  type: RandomFormFieldType;
  validation: zod.ZodType;
};

const checkedValue1 = 'checked1';
const checkedValue2 = 'checked2';
const checkedValue3 = 'checked3';
const radioValueYes = 'yes';
const radioValueNo = 'no';
const radioValueMaybe = 'maybe';

export const SetValue = () => {
  const form = formStoreUtils.createStore<SimpleFormData>({
    onSubmit: () => {},
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="input">
            <Label>Title</Label>
            <Input type="text" name="title" />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="set-value-button" onClick={() => form.setValue('title', 'test')}>
              Set Value
            </Button>
          </div>
        </FormFields>
      </form>
    </div>
  );
};

export const UsingEffects = () => {
  const form = formStoreUtils.createStore<SimpleFormData>({
    onSubmit: () => {},
  });
  const [randomValue, setRandomValue] = createSignal('starting random value');

  createEffect(function effectBasedFormValueUpdate() {
    const newValue = randomValue();

    console.log('should only happen when random value changes');

    form.setValue('title', newValue);
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormField>
          <Label>Title</Label>
          <Input type="text" name="title" />
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-value-button" onClick={() => setRandomValue(uuid.v4())}>
              update random value
            </Button>
          </div>
        </FormField>
      </form>
    </div>
  );
};

export const InitializeWithValues = () => {
  const form = formStoreUtils.createStore<SimpleFormData>({
    onSubmit: () => {},
    initialValues: {
      title: 'test',
      title2: 'test2',
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="input">
            <Label>Title</Label>
            <Input type="text" name="title" />
          </FormField>
          <FormField data-id="input">
            <Label>Title2</Label>
            <Input type="text" name="title2" />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
    </div>
  );
};

export const Clear = () => {
  const form = formStoreUtils.createStore<SimpleFormData>({
    onSubmit: () => {},
    initialValues: {
      title: 'test',
      title2: 'test2',
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="input">
            <Label>Title</Label>
            <Input type="text" name="title" />
          </FormField>
          <FormField data-id="input">
            <Label>Title2</Label>
            <Input type="text" name="title2" />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
    </div>
  );
};

export const ResetWithoutInitial = () => {
  const form = formStoreUtils.createStore<SimpleFormData>({
    onSubmit: () => {},
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="input">
            <Label>Title</Label>
            <Input type="text" name="title" placeholder="placeholder" />
          </FormField>
          <FormField data-id="input">
            <Label>Title2</Label>
            <Input type="text" name="title2" placeholder="placeholder" />
          </FormField>
          <FormField data-id="textarea">
            <Label>Textarea</Label>
            <Textarea name="textarea" placeholder="placeholder" />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode label="Touched Fields">{JSON.stringify(form.touchedFields(), null, 2)}</ExpandableCode>
      <ExpandableCode label="Dirty Fields">{JSON.stringify(form.dirtyFields(), null, 2)}</ExpandableCode>
    </div>
  );
};

export const ResetWithInitial = () => {
  const form = formStoreUtils.createStore<SimpleFormData>({
    onSubmit: () => {},
    initialValues: {
      title: 'test',
      title2: 'test2',
      textarea: 'test3',
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="input">
            <Label>Title</Label>
            <Input type="text" name="title" placeholder="placeholder" />
          </FormField>
          <FormField data-id="input">
            <Label>Title2</Label>
            <Input type="text" name="title2" placeholder="placeholder" />
          </FormField>
          <FormField data-id="textarea">
            <Label>Textarea</Label>
            <Textarea name="textarea" placeholder="placeholder" />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode label="Touched Fields">{JSON.stringify(form.touchedFields(), null, 2)}</ExpandableCode>
      <ExpandableCode label="Dirty Fields">{JSON.stringify(form.dirtyFields(), null, 2)}</ExpandableCode>
    </div>
  );
};

export const IsTouched = () => {
  const form = formStoreUtils.createStore<SimpleFormData>({
    onSubmit: () => {},
    initialValues: {
      title: 'test',
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="input">
            <Label>Title</Label>
            <Input type="text" name="title" />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
          </div>
        </FormFields>
      </form>
      <Show when={form.isTouched('title')}>
        <div data-id="is-touched-indicator">title was touched</div>
      </Show>
    </div>
  );
};

export const Events = () => {
  const [submitTriggered, setSubmitTriggered] = createSignal(false);
  const [clearEventTriggered, setClearEventTriggered] = createSignal(false);
  const [resetEventTriggered, setResetEventTriggered] = createSignal(false);
  const [valueChangedEventTriggered, setValueChangedEventTriggered] = createSignal(false);
  const form = formStoreUtils.createStore<SimpleFormData>({
    schema: simpleFormDataSchema,
    onSubmit: () => {
      setSubmitTriggered(true);
    },
    initialValues: {
      title: 'test',
    },
    onReset: () => {
      setResetEventTriggered(true);
    },
    onClear: () => {
      setClearEventTriggered(true);
    },
  });

  createEffect(function setupFormWatch() {
    const watcher = form.watch((name, data) => {
      if (name !== 'title') {
        return;
      }

      setValueChangedEventTriggered(true);
    });

    return () => {
      watcher.unsubscribe();
    };
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="input-validated" errors={form.errors().title?.errors}>
            <Label>Title</Label>
            <Input type="text" name="title" />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <Show when={valueChangedEventTriggered()}>
        <div data-id="value-changed-event-triggered-indicator">value changed event triggered</div>
      </Show>
      <Show when={clearEventTriggered()}>
        <div data-id="clear-event-triggered-indicator">clear event triggered</div>
      </Show>
      <Show when={resetEventTriggered()}>
        <div data-id="reset-event-triggered-indicator">reset event triggered</div>
      </Show>
      <Show when={submitTriggered()}>
        <div data-id="submit-event-triggered-indicator">submit event triggered</div>
      </Show>
    </div>
  );
};

export const ValidateOnChange = () => {
  const form = formStoreUtils.createStore<SimpleFormData>({
    schema: simpleFormDataSchema,
    onSubmit: () => {},
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField errors={form.errors().title?.errors}>
            <Label>Title</Label>
            <Input type="text" name="title" />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
    </div>
  );
};

export const NoValidateOnChange = () => {
  const form = formStoreUtils.createStore<SimpleFormData>({
    schema: simpleFormDataSchema,
    validateOnChange: false,
    onSubmit: () => {},
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="input-validated" errors={form.errors().title?.errors}>
            <Label>Title</Label>
            <Input type="text" name="title" />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
    </div>
  );
};

export const NestedArrayFields = () => {
  const form = formStoreUtils.createStore<NestedArrayFormData>({
    onSubmit: (data) => {
      console.log(data);
    },
    initialValues: {
      array: [{ partA: 'test', nested: [{ partA: 'test2' }] }],
    },
    schema: nestedArrayFormDataSchema,
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <Button data-id="add-array-field-button" type="button" onclick={() => form.addArrayField('array', {})}>
        + Add Array Field
      </Button>
      <form use:formDirective>
        <FormFields>
          <FormField errors={form.errors().array?.errors}>
            <Index each={form.data().array}>
              {(arrayField, index) => {
                console.log('should only happen once');
                const getArrayFieldError = () => form.errors().array?.[index] ?? {};

                return (
                  <div data-id="array-field-element">
                    <FormFields>
                      <FormField errors={getArrayFieldError().partA?.errors}>
                        <Label>Part A</Label>
                        <Input type="text" name={`array.${index}.partA`} />
                      </FormField>
                      <FormField errors={getArrayFieldError().partB?.errors}>
                        <Label>Part B</Label>
                        <Input type="text" name={`array.${index}.partB`} />
                      </FormField>
                      <FormField errors={getArrayFieldError().nested?.errors}>
                        <Label>Nested</Label>
                        <Button
                          data-id="add-array-field-button"
                          type="button"
                          onclick={() => {
                            // for stress testing lots on input fields
                            // for (let i = 0; i < 50; i++) {
                            form.addArrayField(`array.${index}.nested` as keyof NestedArrayFormData, {});
                            // }
                          }}
                        >
                          + Add Array Field
                        </Button>
                        <Index each={arrayField().nested}>
                          {(arrayField2, index2) => {
                            const getArrayFieldError2 = () => form.errors().array?.[index]?.nested?.[index2] ?? {};

                            return (
                              <div data-id="array-field-element">
                                <FormField errors={getArrayFieldError2().partA?.errors}>
                                  <Label>Part A</Label>
                                  <Input type="text" name={`array.${index}.nested.${index2}.partA`} />
                                </FormField>
                                <FormField errors={getArrayFieldError2().partB?.errors}>
                                  <Label>Part B</Label>
                                  <Input type="text" name={`array.${index}.nested.${index2}.partB`} />
                                </FormField>
                                <FormField errors={getArrayFieldError2().partC?.errors}>
                                  <Label>Part A</Label>
                                  <Input type="text" name={`array.${index}.nested.${index2}.partC`} />
                                </FormField>
                                <FormField errors={getArrayFieldError2().partD?.errors}>
                                  <Label>Part A</Label>
                                  <Input type="text" name={`array.${index}.nested.${index2}.partD`} />
                                </FormField>
                                <FormField errors={getArrayFieldError2().partE?.errors}>
                                  <Label>Part A</Label>
                                  <Input type="text" name={`array.${index}.nested.${index2}.partE`} />
                                </FormField>
                                <FormField errors={getArrayFieldError2().partF?.errors}>
                                  <Label>Part A</Label>
                                  <Input type="text" name={`array.${index}.nested.${index2}.partF`} />
                                </FormField>
                                <FormField errors={getArrayFieldError2().partG?.errors}>
                                  <Label>Part A</Label>
                                  <Input type="text" name={`array.${index}.nested.${index2}.partG`} />
                                </FormField>
                                <FormField errors={getArrayFieldError2().partH?.errors}>
                                  <Label>Part A</Label>
                                  <Input type="text" name={`array.${index}.nested.${index2}.partH`} />
                                </FormField>
                                <FormField errors={getArrayFieldError2().partI?.errors}>
                                  <Label>Part A</Label>
                                  <Input type="text" name={`array.${index}.nested.${index2}.partI`} />
                                </FormField>
                                <FormField errors={getArrayFieldError2().partJ?.errors}>
                                  <Label>Part A</Label>
                                  <Input type="text" name={`array.${index}.nested.${index2}.partJ`} />
                                </FormField>
                                <Button
                                  // @todo(!!!) make danger when implemented
                                  data-id="remove-array-field-button"
                                  onclick={() =>
                                    form.removeArrayField(`array.${index}.nested` as keyof NestedArrayFormData, index2)
                                  }
                                >
                                  REMOVE
                                </Button>
                              </div>
                            );
                          }}
                        </Index>
                      </FormField>
                      <Button
                        // @todo(!!!) make danger when implemented
                        data-id="remove-array-field-button"
                        onclick={() => form.removeArrayField('array', index)}
                      >
                        REMOVE
                      </Button>
                    </FormFields>
                  </div>
                );
              }}
            </Index>
          </FormField>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
        </FormFields>
      </form>
      <hr />
      <h1>Debug Tools</h1>
      <ExpandableCode label="Data">{JSON.stringify(form.data(), null, 2)}</ExpandableCode>
      <ExpandableCode label="Errors">{JSON.stringify(form.errors(), null, 2)}</ExpandableCode>
      <ExpandableCode label="Touched Fields">{JSON.stringify(form.touchedFields(), null, 2)}</ExpandableCode>
    </div>
  );
};

export const DynamicFormElements = () => {
  const possibleRandomFields: RandomFormField[] = [
    {
      name: 'string',
      type: RandomFormFieldType.STRING,
      validation: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    },
    {
      name: 'number',
      type: RandomFormFieldType.NUMBER,
      validation: zod.coerce.number().min(10, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    },
    {
      name: 'checkbox',
      type: RandomFormFieldType.CHECKBOX,
      validation: zod.string().array().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    },
    {
      name: 'single-checkbox',
      type: RandomFormFieldType.SINGLE_CHECKBOX,
      validation: zod.string().array().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    },
    {
      name: 'checkbox-toggle',
      type: RandomFormFieldType.CHECKBOX_TOGGLE,
      validation: zod.string().array().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    },
    {
      name: 'combobox',
      type: RandomFormFieldType.COMBOBOX,
      validation: zod.number().array().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    },
    {
      name: 'radio',
      type: RandomFormFieldType.RADIO,
      validation: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    },
    {
      name: 'single-radio',
      type: RandomFormFieldType.SINGLE_RADIO,
      validation: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    },
    {
      name: 'textarea',
      type: RandomFormFieldType.TEXTAREA,
      validation: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    },
    {
      name: 'date',
      type: RandomFormFieldType.DATE,
      // @todo(!!!) date specific validation
      validation: zod.custom<string>((value) => validationUtils.isValidDate(value), {
        message: 'must select a date',
      }),
    },
    {
      name: 'date-range',
      type: RandomFormFieldType.DATE_RANGE,
      // @todo(!!!) date specific validation
      validation: zod.custom<string[]>((value) => validationUtils.isValidDateRange(value), {
        message: 'must select a date',
      }),
    },
    {
      name: 'time-input',
      type: RandomFormFieldType.TIME_INPUT,
      // @todo(!!!) date specific validation
      validation: zod.custom<string>((value) => timeInputComponentUtils.isValidTime(value), {
        message: 'must select a time',
      }),
    },
    {
      name: 'array',
      type: RandomFormFieldType.ARRAY,
      validation: zod
        .object({
          partA: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
          partB: zod.string().optional(),
        })
        .array()
        .min(2, validationUtils.getMessage(ValidationMessageType.MINIMUM_COUNT, ['2', 'items'])),
    },
  ];

  const form = formStoreUtils.createStore<DynamicFormData>({
    schema: dynamicFormDataSchema,
    initialValues: {
      addDefaultValue: ['yes'],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [addDefaultValue, setAddDefaultValue] = createSignal(true);
  const [comboboxValues, setComboboxValues] = createSignal<Record<string, ComboboxValueStore>>({});
  const [datePickerValues, setDatePickerValues] = createSignal<Record<string, DateRangeStore>>();
  const [randomInputs, setRandomInputs] = createSignal<RandomFormField[]>([]);

  const addRandomField = (randomField: RandomFormField) => {
    const randomFieldName = `${randomField.name}${randomInputs().length + 1}`;
    const currentAddDefaultValue = addDefaultValue();

    if (randomField.type === RandomFormFieldType.COMBOBOX) {
      setComboboxValues({
        ...comboboxValues(),
        [randomFieldName]: comboboxComponentUtils.createValueStore(),
      });
    }

    if (randomField.type === RandomFormFieldType.DATE || randomField.type === RandomFormFieldType.DATE_RANGE) {
      setDatePickerValues({
        ...datePickerValues(),
        [randomFieldName]: dateStoreUtils.createDateRangeStore(),
      });
    }

    setRandomInputs([
      ...randomInputs(),
      {
        ...randomField,
        name: randomFieldName,
      },
    ]);

    // need to make sure this runs after the input are set otherwise this will error out
    if (currentAddDefaultValue) {
      if (randomField.type === RandomFormFieldType.CHECKBOX_TOGGLE) {
        form.setValue(randomFieldName, [checkedValue1]);
      }

      if (randomField.type === RandomFormFieldType.RADIO) {
        form.setValue(randomFieldName, radioValueMaybe);
      }
    }
  };

  createEffect(function updateFormSchema() {
    const customZodElements: Record<keyof DynamicFormData, ZodType> = {};

    for (const input of randomInputs()) {
      customZodElements[input.name] = input.validation;
    }

    form.setSchema(
      zodUtils.schemaForType<DynamicFormData>()(
        zod.object({
          ...dynamicFormDataSchema.shape,
          ...customZodElements,
        }),
      ),
    );
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <For each={possibleRandomFields}>
        {(randomField) => {
          return (
            <Button data-id={`add-${randomField.type}-field`} onClick={() => addRandomField(randomField)}>
              Add {randomField.name} Field
            </Button>
          );
        }}
      </For>
      <form use:formDirective>
        <FormFields>
          <Checkbox labelElement="add default value" name="addDefaultValue" value="yes" />
          <FormField errors={form.errors().title?.errors}>
            <Label>Title</Label>
            <Input type="text" name="title" />
          </FormField>
          <Show when={randomInputs().length > 0}>
            <For each={randomInputs()}>
              {(input) => {
                const getValidationState = () =>
                  form.errors()[input.name]?.errors ? FormInputValidationState.INVALID : FormInputValidationState.VALID;

                return (
                  <FormField data-id={input.type} errors={form.errors()[input.name]?.errors}>
                    <Label>{input.name}</Label>
                    <Switch>
                      <Match when={input.type === RandomFormFieldType.STRING}>
                        <Input type="text" name={input.name} placeholder="placeholder" />
                      </Match>
                      <Match when={input.type === RandomFormFieldType.NUMBER}>
                        <Input type="number" name={input.name} placeholder="placeholder" />
                      </Match>
                      <Match when={input.type === RandomFormFieldType.CHECKBOX}>
                        <Checkbox.Group>
                          <Checkbox labelElement="checked 1" name={input.name} value={checkedValue1} />
                          <Checkbox labelElement="checked 2" name={input.name} value={checkedValue2} />
                          <Checkbox labelElement="checked 3" name={input.name} value={checkedValue3} />
                        </Checkbox.Group>
                      </Match>
                      <Match when={input.type === RandomFormFieldType.SINGLE_CHECKBOX}>
                        <Checkbox labelElement="checked 1" name={input.name} value={checkedValue1} />
                      </Match>
                      <Match when={input.type === RandomFormFieldType.CHECKBOX_TOGGLE}>
                        <Checkbox.Toggle labelElement="yes" name={input.name} value={checkedValue1} />
                      </Match>
                      <Match when={input.type === RandomFormFieldType.RADIO}>
                        <Radio.Group>
                          <Radio labelElement="yes" name={input.name} value={radioValueYes} />
                          <Radio labelElement="no" name={input.name} value={radioValueNo} />
                          <Radio labelElement="maybe" name={input.name} value={radioValueMaybe} />
                        </Radio.Group>
                      </Match>
                      <Match when={input.type === RandomFormFieldType.SINGLE_RADIO}>
                        <Radio labelElement="yes" name={input.name} value={radioValueYes} />
                      </Match>
                      <Match when={input.type === RandomFormFieldType.TEXTAREA}>
                        <Textarea name={input.name} placeholder="placeholder" />
                      </Match>
                      <Match when={input.type === RandomFormFieldType.DATE}>
                        <DatePicker.Input
                          includeTime
                          name={input.name}
                          placeholder="placeholder"
                          onSelectDate={(date?: Date, which?: WhichDate) => {
                            datePickerValues()?.[input.name]?.setDate(date, which);

                            form.setValue(input.name, datePickerValues()?.[input.name]?.getFormValue());
                          }}
                        />
                      </Match>
                      <Match when={input.type === RandomFormFieldType.DATE_RANGE}>
                        <DatePicker.Input
                          isRange
                          name={input.name}
                          placeholder="placeholder"
                          onSelectDate={(date?: Date, which?: WhichDate) => {
                            datePickerValues()?.[input.name]?.setDate(date, which);

                            // we don't want to mark as touched in the case and setting 1 date in the range would
                            // always result in a validation error
                            form.setValue(input.name, datePickerValues()?.[input.name]?.getFormValue(), {
                              markAsTouched: false,
                            });
                          }}
                        />
                      </Match>
                      <Match when={input.type === RandomFormFieldType.TIME_INPUT}>
                        <TimeInput name={input.name} />
                      </Match>
                      <Match when={input.type === RandomFormFieldType.ARRAY}>
                        <For each={form.data()[input.name] as NestStructure[]}>
                          {(arrayField, index) => {
                            const getArrayFieldErrors = () => form.errors()[input.name]?.[index()] ?? {};

                            return (
                              <div data-id="array-field-element">
                                <FormField errors={getArrayFieldErrors().partA?.errors}>
                                  <Label>Part A</Label>
                                  <Input
                                    type="text"
                                    name={`${input.name}.${index()}.partA`}
                                    placeholder="placeholder"
                                  />
                                </FormField>
                                <FormField errors={getArrayFieldErrors().partB?.errors}>
                                  <Label>Part B</Label>
                                  <Input
                                    type="text"
                                    name={`${input.name}.${index()}.partB`}
                                    placeholder="placeholder"
                                  />
                                </FormField>
                                <Button
                                  data-id="remove-array-field-button"
                                  // @todo(!!!) make danger when implemented
                                  onclick={() => form.removeArrayField(input.name, index())}
                                >
                                  REMOVE
                                </Button>
                              </div>
                            );
                          }}
                        </For>
                        <Button
                          data-id="add-array-field-button"
                          type="button"
                          onclick={() => form.addArrayField(input.name, {})}
                        >
                          + Add Array Field
                        </Button>
                      </Match>
                      <Match when={input.type === RandomFormFieldType.COMBOBOX}>
                        <Combobox
                          autoShowOptions
                          options={[
                            { label: 'option 1', value: 11 },
                            { label: 'option 2', value: 22 },
                            { label: 'option 3', value: 33 },
                            { label: 'option 4', value: 44 },
                          ]}
                          filterOptions={comboboxComponentUtils.excludeSelectedFilter}
                          setSelected={(options: ComboboxOption[]) => {
                            // cast needed since auto complete values can be a number of types
                            const value = options.map((option) => option.value) as number[];

                            form.setValue(input.name, value);
                            comboboxValues()[input.name].setSelected(options);
                          }}
                          selected={comboboxValues()[input.name].selected()}
                          name={input.name}
                          selectedComponent={Combobox.SelectedOption}
                          selectableComponent={Combobox.SelectableOption}
                          placeholder="placeholder"
                        />
                      </Match>
                    </Switch>
                  </FormField>
                );
              }}
            </For>
          </Show>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
        </FormFields>
      </form>
      <hr />
      <h1>Debug Tools</h1>
      <ExpandableCode label="Errors">{JSON.stringify(form.errors(), null, 2)}</ExpandableCode>
      <ExpandableCode label="Touched Fields">{JSON.stringify(form.touchedFields(), null, 2)}</ExpandableCode>
      <ExpandableCode label="Dirty Fields">{JSON.stringify(form.dirtyFields(), null, 2)}</ExpandableCode>
    </div>
  );
};

export const ValidateWith = () => {
  type FormData = {
    title: string;
    confirmTitle: string;
  };

  const buildFormSchema = (formData: Accessor<Partial<FormData>>) => {
    const schema = zodUtils.schemaForType<FormData>()(
      zod.object({
        title: zod
          .string()
          .min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED))
          .superRefine((value, context) => {
            if (!formData().confirmTitle || value === formData().confirmTitle) {
              return;
            }

            context.addIssue({
              code: zod.ZodIssueCode.custom,
              message: 'Titles do not match',
            });
          }),
        confirmTitle: zod
          .string()
          .min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED))
          .superRefine((value, context) => {
            if (!formData().title || value === formData().title) {
              return;
            }

            context.addIssue({
              code: zod.ZodIssueCode.custom,
              message: 'Titles do not match',
            });
          }),
      }),
    );

    return schema;
  };

  const form = formStoreUtils.createStore<FormData>({
    buildSchema: buildFormSchema,
    validateWith: {
      title: ['confirmTitle'],
      confirmTitle: ['title'],
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField errors={form.errors()?.title?.errors}>
            <Label>Title</Label>
            <Input type="text" name="title" formData={form.data} />
          </FormField>
          <FormField errors={form.errors()?.confirmTitle?.errors}>
            <Label>Confirm Title</Label>
            <Input type="text" name="confirmTitle" formData={form.data} />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
          </div>
        </FormFields>
      </form>
    </div>
  );
};

export const ValidationArrayFields = () => {
  type ObjectFormData = {
    partA: string;
    partB?: string;
  };

  type FormData = {
    array?: ObjectFormData[];
    arrayValidated: ObjectFormData[];
  };

  const schemaFormData = zodUtils.schemaForType<FormData>()(
    zod.object({
      array: zod
        .object({
          partA: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
          partB: zod.string().optional(),
        })
        .array()
        .optional(),
      arrayValidated: zod
        .object({
          partA: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
          partB: zod.string().optional(),
        })
        .array()
        .min(2, '2 Required'),
    }),
  );

  const form = formStoreUtils.createStore<FormData>({
    onSubmit: (data) => {
      console.log(data);
    },
    schema: schemaFormData,
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField errors={form.errors().array?.errors}>
            <Label>Array</Label>
            <Index each={form.data().array}>
              {(_arrayField, index) => {
                const getArrayFieldError = () => form.errors().array?.[index] ?? {};

                return (
                  <div data-id="array">
                    <FormFields>
                      <FormField errors={getArrayFieldError().partA?.errors}>
                        <Label>Part A</Label>
                        <Input type="text" name={`array.${index}.partA`} />
                      </FormField>
                      <FormField errors={getArrayFieldError().partB?.errors}>
                        <Label>Part B</Label>
                        <Input type="text" name={`array.${index}.partB`} />
                      </FormField>
                      <Button
                        // @todo(!!!) make danger when implemented
                        data-id="remove-array-field-button"
                        onclick={() => form.removeArrayField('array', index)}
                      >
                        REMOVE
                      </Button>
                    </FormFields>
                  </div>
                );
              }}
            </Index>
          </FormField>
          <Button data-id="add-array-field-button" type="button" onclick={() => form.addArrayField('array', {})}>
            + Add Array Field
          </Button>
          <FormField errors={form.errors().arrayValidated?.errors}>
            <Label>Array Validated</Label>
            <Index each={form.data().arrayValidated}>
              {(_arrayField, index) => {
                const getArrayFieldError = () => form.errors().arrayValidated?.[index] ?? {};

                return (
                  <div data-id="array-validated">
                    <FormFields>
                      <FormField errors={getArrayFieldError().partA?.errors}>
                        <Label>Part A</Label>
                        <Input type="text" name={`arrayValidated.${index}.partA`} />
                      </FormField>
                      <FormField errors={getArrayFieldError().partB?.errors}>
                        <Label>Part B</Label>
                        <Input type="text" name={`arrayValidated.${index}.partB`} />
                      </FormField>
                      <Button
                        // @todo(!!!) make danger when implemented
                        data-id="remove-array-field-button"
                        onclick={() => form.removeArrayField('arrayValidated', index)}
                      >
                        REMOVE
                      </Button>
                    </FormFields>
                  </div>
                );
              }}
            </Index>
          </FormField>
          <Button
            data-id="add-array-field-validated-button"
            type="button"
            onclick={() => form.addArrayField('arrayValidated', {})}
          >
            + Add Array Field Validated
          </Button>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <hr />
      <h1>Debug Tools</h1>
      <ExpandableCode label="Errors">{JSON.stringify(form.errors(), null, 2)}</ExpandableCode>
      <ExpandableCode label="Touched Fields">{JSON.stringify(form.touchedFields(), null, 2)}</ExpandableCode>
    </div>
  );
};

export const ValidationCheckboxBoolean = () => {
  type FormData = {
    checkbox?: boolean;
    checkboxValidated: boolean;
  };

  const schema = zodUtils.schemaForType<FormData>()(
    zod.object({
      checkbox: zod.boolean().optional(),
      checkboxValidated: zod
        .boolean()
        .refine((value) => value, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const form = formStoreUtils.createStore<FormData>({
    schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="checkbox" errors={form.errors()?.checkbox?.errors}>
            <Label>Checkbox</Label>
            <Checkbox name="checkbox" formData={form.data} labelElement="Value 1" />
          </FormField>
          <FormField data-id="checkbox-validated" errors={form.errors()?.checkboxValidated?.errors}>
            <Label>Checkbox Validated</Label>
            <Checkbox name="checkboxValidated" formData={form.data} labelElement="Value 1" />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode data-id="errors" label="Errors">
        {JSON.stringify(form.errors(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="touched-fields" label="Touched Fields">
        {JSON.stringify(form.touchedFields(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="dirty-fields" label="Dirty Fields">
        {JSON.stringify(form.dirtyFields(), null, 2)}
      </ExpandableCode>
    </div>
  );
};

export const ValidationCheckboxValues = () => {
  type FormData = {
    checkbox?: string[];
    checkboxValidated: string[];
  };

  const schema = zodUtils.schemaForType<FormData>()(
    zod.object({
      checkbox: zod.array(zod.string()).optional(),
      checkboxValidated: zod.array(zod.string()).min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const form = formStoreUtils.createStore<FormData>({
    schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="checkbox" errors={form.errors()?.checkbox?.errors}>
            <Label>Checkbox</Label>
            <Checkbox.Group>
              <Checkbox name="checkbox" formData={form.data} labelElement="Value 1" value="1" />
              <Checkbox name="checkbox" formData={form.data} labelElement="Value 2" value="2" />
              <Checkbox name="checkbox" formData={form.data} labelElement="Value 3" value="3" />
            </Checkbox.Group>
          </FormField>
          <FormField data-id="checkbox-validated" errors={form.errors()?.checkboxValidated?.errors}>
            <Label>Checkbox Validated</Label>
            <Checkbox.Group>
              <Checkbox name="checkboxValidated" formData={form.data} labelElement="Value 1" value="1" />
              <Checkbox name="checkboxValidated" formData={form.data} labelElement="Value 2" value="2" />
              <Checkbox name="checkboxValidated" formData={form.data} labelElement="Value 3" value="3" />
            </Checkbox.Group>
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode data-id="errors" label="Errors">
        {JSON.stringify(form.errors(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="touched-fields" label="Touched Fields">
        {JSON.stringify(form.touchedFields(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="dirty-fields" label="Dirty Fields">
        {JSON.stringify(form.dirtyFields(), null, 2)}
      </ExpandableCode>
    </div>
  );
};

export const ValidationCheckboxToggle = () => {
  type FormData = {
    checkboxToggle?: string;
    checkboxToggleValidated: string;
  };

  const schema = zodUtils.schemaForType<FormData>()(
    zod.object({
      checkboxToggle: zod.string().optional(),
      checkboxToggleValidated: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const form = formStoreUtils.createStore<FormData>({
    schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="checkbox-toggle" errors={form.errors()?.checkboxToggle?.errors}>
            <Label>Checkbox Toggle</Label>
            <Checkbox.Toggle name="checkboxToggle" formData={form.data} labelElement="checkbox toggle value" />
          </FormField>
          <FormField data-id="checkbox-toggle-validated" errors={form.errors()?.checkboxToggleValidated?.errors}>
            <Label>Checkbox Toggle Validated</Label>
            <Checkbox.Toggle name="checkboxToggleValidated" formData={form.data} labelElement="checkbox toggle value" />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode data-id="errors" label="Errors">
        {JSON.stringify(form.errors(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="touched-fields" label="Touched Fields">
        {JSON.stringify(form.touchedFields(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="dirty-fields" label="Dirty Fields">
        {JSON.stringify(form.dirtyFields(), null, 2)}
      </ExpandableCode>
    </div>
  );
};

export const ValidationCombobox = () => {
  type FormData = {
    combobox?: CommonDataType;
    comboboxValidated: CommonDataType;
  };

  const schema = zodUtils.schemaForType<FormData>()(
    zod.object({
      combobox: zod.string().optional(),
      comboboxValidated: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const comboboxValueStore = comboboxComponentUtils.createValueStore<FormData['combobox']>();
  const comboboxValidatedValueStore = comboboxComponentUtils.createValueStore<FormData['comboboxValidated']>();

  const form = formStoreUtils.createStore<FormData>({
    schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="combobox" errors={form.errors()?.combobox?.errors}>
            <Label>Combobox</Label>
            <Combobox
              name="combobox"
              autoShowOptions
              formData={form.data}
              options={[
                { label: 'option 1', value: '11' },
                { label: 'option 2', value: '22' },
              ]}
              selected={comboboxValueStore.selected()}
              setSelected={(selectedOptions) => {
                form.setValue('combobox', selectedOptions[0]?.value);
                comboboxValueStore.setSelected(selectedOptions);
              }}
            />
          </FormField>
          <FormField data-id="combobox-validated" errors={form.errors()?.comboboxValidated?.errors}>
            <Label>Combobox Validated</Label>
            <Combobox
              name="comboboxValidated"
              autoShowOptions
              formData={form.data}
              options={[
                { label: 'option 1', value: '11' },
                { label: 'option 2', value: '22' },
              ]}
              selected={comboboxValidatedValueStore.selected()}
              setSelected={(selectedOptions) => {
                form.setValue('comboboxValidated', selectedOptions[0]?.value);
                comboboxValidatedValueStore.setSelected(selectedOptions);
              }}
            />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode data-id="errors" label="Errors">
        {JSON.stringify(form.errors(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="touched-fields" label="Touched Fields">
        {JSON.stringify(form.touchedFields(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="dirty-fields" label="Dirty Fields">
        {JSON.stringify(form.dirtyFields(), null, 2)}
      </ExpandableCode>
    </div>
  );
};

export const ValidationDate = () => {
  type FormData = {
    date?: string;
    dateValidated: string;
  };

  const schema = zodUtils.schemaForType<FormData>()(
    zod.object({
      date: zod.string().optional(),
      dateValidated: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const form = formStoreUtils.createStore<FormData>({
    schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="date" errors={form.errors()?.date?.errors}>
            <Label>Date</Label>
            <DatePicker.Input name="date" formData={form.data} />
          </FormField>
          <FormField data-id="date-validated" errors={form.errors()?.dateValidated?.errors}>
            <Label>Date Validated</Label>
            <DatePicker.Input name="dateValidated" formData={form.data} />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode data-id="errors" label="Errors">
        {JSON.stringify(form.errors(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="touched-fields" label="Touched Fields">
        {JSON.stringify(form.touchedFields(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="dirty-fields" label="Dirty Fields">
        {JSON.stringify(form.dirtyFields(), null, 2)}
      </ExpandableCode>
    </div>
  );
};

export const ValidationDateRange = () => {
  type FormData = {
    dateRange?: string[];
    dateRangeValidated: string[];
  };

  const schema = zodUtils.schemaForType<FormData>()(
    zod.object({
      dateRange: zod.array(zod.string()).optional(),
      dateRangeValidated: zod.array(zod.string()).min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const form = formStoreUtils.createStore<FormData>({
    schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="date-range" errors={form.errors()?.dateRange?.errors}>
            <Label>Date Range</Label>
            <DatePicker.Input name="dateRange" formData={form.data} />
          </FormField>
          <FormField data-id="date-range-validated" errors={form.errors()?.dateRangeValidated?.errors}>
            <Label>Date Range Validated</Label>
            <DatePicker.Input name="dateRangeValidated" formData={form.data} />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode data-id="errors" label="Errors">
        {JSON.stringify(form.errors(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="touched-fields" label="Touched Fields">
        {JSON.stringify(form.touchedFields(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="dirty-fields" label="Dirty Fields">
        {JSON.stringify(form.dirtyFields(), null, 2)}
      </ExpandableCode>
    </div>
  );
};

export const ValidationInput = () => {
  type FormData = {
    input?: string;
    inputValidated: string;
  };

  const schema = zodUtils.schemaForType<FormData>()(
    zod.object({
      input: zod.string().optional(),
      inputValidated: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const form = formStoreUtils.createStore<FormData>({
    schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="input" errors={form.errors()?.input?.errors}>
            <Label>Input</Label>
            <Input name="input" formData={form.data} />
          </FormField>
          <FormField data-id="input-validated" errors={form.errors()?.inputValidated?.errors}>
            <Label>Input Validated</Label>
            <Input name="inputValidated" formData={form.data} />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode data-id="errors" label="Errors">
        {JSON.stringify(form.errors(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="touched-fields" label="Touched Fields">
        {JSON.stringify(form.touchedFields(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="dirty-fields" label="Dirty Fields">
        {JSON.stringify(form.dirtyFields(), null, 2)}
      </ExpandableCode>
    </div>
  );
};

export const ValidationNumber = () => {
  type FormData = {
    inputNumber?: string;
    inputNumberValidated: string;
  };

  const schema = zodUtils.schemaForType<FormData>()(
    zod.object({
      inputNumber: zod.string().optional(),
      inputNumberValidated: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const form = formStoreUtils.createStore<FormData>({
    schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="input-number" errors={form.errors()?.inputNumber?.errors}>
            <Label>Input Number</Label>
            <Input type="number" name="inputNumber" formData={form.data} />
          </FormField>
          <FormField data-id="input-number-validated" errors={form.errors()?.inputNumberValidated?.errors}>
            <Label>Input Number Validated</Label>
            <Input type="number" name="inputNumberValidated" formData={form.data} />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode data-id="errors" label="Errors">
        {JSON.stringify(form.errors(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="touched-fields" label="Touched Fields">
        {JSON.stringify(form.touchedFields(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="dirty-fields" label="Dirty Fields">
        {JSON.stringify(form.dirtyFields(), null, 2)}
      </ExpandableCode>
    </div>
  );
};

export const ValidationRadio = () => {
  type FormData = {
    radio?: string;
    radioValidated: string;
  };

  const schema = zodUtils.schemaForType<FormData>()(
    zod.object({
      radio: zod.string().optional(),
      radioValidated: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const form = formStoreUtils.createStore<FormData>({
    schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="radio" errors={form.errors()?.radio?.errors}>
            <Label>Radio</Label>
            <Radio name="radio" formData={form.data} labelElement="radio value" />
          </FormField>
          <FormField data-id="radio-validated" errors={form.errors()?.radioValidated?.errors}>
            <Label>Radio Validated</Label>
            <Radio name="radioValidated" formData={form.data} labelElement="radio value" />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode data-id="errors" label="Errors">
        {JSON.stringify(form.errors(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="touched-fields" label="Touched Fields">
        {JSON.stringify(form.touchedFields(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="dirty-fields" label="Dirty Fields">
        {JSON.stringify(form.dirtyFields(), null, 2)}
      </ExpandableCode>
    </div>
  );
};

export const ValidationTextarea = () => {
  type FormData = {
    textarea?: string;
    textareaValidated: string;
  };

  const schema = zodUtils.schemaForType<FormData>()(
    zod.object({
      textarea: zod.string().optional(),
      textareaValidated: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const form = formStoreUtils.createStore<FormData>({
    schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="textarea" errors={form.errors()?.textarea?.errors}>
            <Label>Textarea</Label>
            <Textarea name="textarea" formData={form.data} />
          </FormField>
          <FormField data-id="textarea-validated" errors={form.errors()?.textareaValidated?.errors}>
            <Label>Textarea Validated</Label>
            <Textarea name="textareaValidated" formData={form.data} />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode data-id="errors" label="Errors">
        {JSON.stringify(form.errors(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="touched-fields" label="Touched Fields">
        {JSON.stringify(form.touchedFields(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="dirty-fields" label="Dirty Fields">
        {JSON.stringify(form.dirtyFields(), null, 2)}
      </ExpandableCode>
    </div>
  );
};

export const ValidationTime = () => {
  type FormData = {
    timeInput?: string;
    timeInputValidated: string;
  };

  const schema = zodUtils.schemaForType<FormData>()(
    zod.object({
      timeInput: zod.string().optional(),
      timeInputValidated: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const form = formStoreUtils.createStore<FormData>({
    schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField data-id="time-input" errors={form.errors()?.timeInput?.errors}>
            <Label>Time Input</Label>
            <TimeInput name="timeInput" formData={form.data} />
          </FormField>
          <FormField data-id="time-input-validated" errors={form.errors()?.timeInputValidated?.errors}>
            <Label>Time Input Validated</Label>
            <TimeInput name="timeInputValidated" formData={form.data} />
          </FormField>
          <div>
            <Button data-id="submit-button" type="submit">
              Submit
            </Button>
            <Button data-id="reset-button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button data-id="clear-button" onClick={() => form.clear()}>
              Clear
            </Button>
          </div>
        </FormFields>
      </form>
      <ExpandableCode data-id="errors" label="Errors">
        {JSON.stringify(form.errors(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="touched-fields" label="Touched Fields">
        {JSON.stringify(form.touchedFields(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="dirty-fields" label="Dirty Fields">
        {JSON.stringify(form.dirtyFields(), null, 2)}
      </ExpandableCode>
    </div>
  );
};

export const ValidationComplexObject = () => {
  type FormData = {
    timeInput?: string;
    timeInputValidated: string;
  };

  const schema = zodUtils.schemaForType<FormData>()(
    zod.object({
      timeInput: zod.string().optional(),
      timeInputValidated: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  const form = formStoreUtils.createStore<FormData>({
    schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const formDirective = form.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>TODO</form>
      <ExpandableCode data-id="errors" label="Errors">
        {JSON.stringify(form.errors(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="touched-fields" label="Touched Fields">
        {JSON.stringify(form.touchedFields(), null, 2)}
      </ExpandableCode>
      <ExpandableCode data-id="dirty-fields" label="Dirty Fields">
        {JSON.stringify(form.dirtyFields(), null, 2)}
      </ExpandableCode>
    </div>
  );
};
