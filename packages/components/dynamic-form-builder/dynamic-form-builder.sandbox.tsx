import Button from '$/components/button';
import Combobox, { comboboxComponentUtils, type ComboboxExtraData, type ComboboxOption } from '$/components/combobox';
import DynamicFormBuilder, {
  dynamicFormBuilderComponentUtils,
  DynamicFormBuilderFieldType,
  type DynamicFormBuilderFields,
} from '$/components/dynamic-form-builder';
import FormField from '$/components/form-field';
import FormFields from '$/components/form-fields';
import Input from '$/components/input';
import Label from '$/components/label';
import { type DefaultFormData, formStoreUtils } from '$/stores/form.store';
import { ValidationMessageType } from '$/utils/validation';
import { createSignal } from 'solid-js';
import * as zod from 'zod';

export default {
  title: 'Components/DynamicFormBuilder',
};

const formFields: DynamicFormBuilderFields = [
  {
    name: 'title',
    label: 'Title',
    type: DynamicFormBuilderFieldType.TEXT,
    required: true,
    placeholder: 'Placeholder...',
  },
  {
    name: 'password',
    label: 'Password',
    type: DynamicFormBuilderFieldType.PASSWORD,
    required: true,
  },
  {
    name: 'textarea',
    label: 'Textarea',
    type: DynamicFormBuilderFieldType.TEXTAREA,
    required: true,
    placeholder: 'Some placeholder value...',
  },
  {
    name: 'radio',
    label: 'My Radio',
    type: DynamicFormBuilderFieldType.RADIO,
    required: true,
    options: [
      {
        value: '1',
        label: 'Option 1',
      },
      {
        value: '2',
        label: 'Option 2',
      },
    ],
  },
  {
    name: 'singleCheckbox',
    type: DynamicFormBuilderFieldType.CHECKBOX,
    required: true,
    options: [
      {
        value: '1',
        label: 'No Grouping Label',
      },
    ],
  },
  {
    name: 'multipleCheckbox',
    label: 'Grouping Label',
    type: DynamicFormBuilderFieldType.CHECKBOX_MULTIPLE,
    required: true,
    options: [
      {
        value: '1',
        label: 'Option 1',
      },
      {
        value: '2',
        label: 'Option 2',
      },
      {
        value: '3',
        label: 'Option 3',
      },
    ],
  },
  {
    name: 'selectOne',
    label: 'Select one',
    placeholder: 'Select one...',
    type: DynamicFormBuilderFieldType.SELECT,
    required: true,
    options: [
      {
        value: '1',
        label: 'Option 1',
      },
      {
        value: '2',
        label: 'Option 2',
      },
      {
        value: '3',
        label: 'Option 3',
      },
    ],
  },
];
const formFieldsNoRequired: DynamicFormBuilderFields = formFields.map((field) => {
  return {
    ...field,
    required: false,
  };
});
const staticFormSchema = {
  staticField: zod.string().min(1, ValidationMessageType.REQUIRED),
};
const dynamicFieldsSelection: ComboboxOption[] = [
  { label: 'With Validation', value: 1 },
  { label: 'Without Validation', value: 2 },
];

export const AllSupportedFieldTypes = () => {
  const [currentDynamicFields, setCurrentDynamicFields] = createSignal<DynamicFormBuilderFields>(formFields);

  const comboboxValueStore = comboboxComponentUtils.createValueStore<ComboboxExtraData>({
    defaultValue: [{ label: 'With Validation', value: 1 }],
  });
  const formStore = formStoreUtils.createStore<DefaultFormData>({
    onSubmit: (data) => {
      console.log(data);
      console.log(dynamicFormBuilderComponentUtils.convertData(data, currentDynamicFields()));
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField errors={formStore.errors().dynamicFieldsSelection?.errors}>
            <Combobox
              autoShowOptions
              options={[
                { label: 'With Validation', value: 1 },
                { label: 'Without Validation', value: 2 },
              ]}
              setSelected={(options: ComboboxOption[]) => {
                const value = options.map((option) => option.value)[0] as number;

                setCurrentDynamicFields(value === 2 ? formFieldsNoRequired : formFields);
                formStore.setValue('dynamicFieldsSelection', value);
                comboboxValueStore.setSelected(options);
              }}
              selected={comboboxValueStore.selected()}
              name="dynamicFieldsSelection"
              selectedComponent={Combobox.SelectedOption}
              selectableComponent={Combobox.SelectableOption}
            />
          </FormField>
          <FormField errors={formStore.errors().staticField?.errors}>
            <Label>Static Field</Label>
            <Input type="text" name="staticField" formData={formStore.data} />
          </FormField>
          <DynamicFormBuilder
            fields={currentDynamicFields()}
            formStore={formStore}
            staticFormSchema={staticFormSchema}
          />
        </FormFields>
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <div>touched fields</div>
      <pre>{JSON.stringify(formStore.touchedFields(), null, 2)}</pre>
      <div>errors</div>
      <pre>{JSON.stringify(formStore.errors(), null, 2)}</pre>
    </div>
  );
};

export const PrePopulated = () => {
  const [currentDynamicFields, setCurrentDynamicFields] = createSignal<DynamicFormBuilderFields>(formFields);

  const comboboxValueStore = comboboxComponentUtils.createValueStore<ComboboxExtraData>({
    defaultValue: [dynamicFieldsSelection[0]],
  });
  const formStore = formStoreUtils.createStore<DefaultFormData>({
    initialValues: {
      dynamicFieldsSelection: dynamicFieldsSelection[0].value,
      staticField: 'test',
      title: 'title',
      password: 'password',
      textarea: 'text\narea',
      radio: '2',
      singleCheckbox: ['1'],
      multipleCheckbox: ['1', '3'],
      selectOne: '2',
    },
    onSubmit: (data) => {
      console.log(data);
      console.log(dynamicFormBuilderComponentUtils.convertData(data, currentDynamicFields()));
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <FormField>
            <Combobox
              autoShowOptions
              options={dynamicFieldsSelection}
              setSelected={(options: ComboboxOption[]) => {
                const value = options.map((option) => option.value)[0] as number;

                setCurrentDynamicFields(value === 2 ? formFieldsNoRequired : formFields);
                formStore.setValue('dynamicFieldsSelection', value);
                comboboxValueStore.setSelected(options);
              }}
              selected={comboboxValueStore.selected()}
              name="dynamicFieldsSelection"
              selectedComponent={Combobox.SelectedOption}
              selectableComponent={Combobox.SelectableOption}
            />
          </FormField>
          <FormField errors={formStore.errors().staticField?.errors}>
            <Label>Static Field</Label>
            <Input type="text" name="staticField" formData={formStore.data} />
          </FormField>
          <DynamicFormBuilder
            fields={currentDynamicFields()}
            formStore={formStore}
            staticFormSchema={staticFormSchema}
          />
        </FormFields>
        <div>
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <div>touched fields</div>
      <pre>{JSON.stringify(formStore.touchedFields(), null, 2)}</pre>
      <div>errors</div>
      <pre>{JSON.stringify(formStore.errors(), null, 2)}</pre>
    </div>
  );
};
