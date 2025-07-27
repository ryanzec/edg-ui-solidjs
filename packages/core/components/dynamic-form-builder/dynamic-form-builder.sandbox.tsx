import { createSignal } from 'solid-js';
import * as zod from 'zod';
import Button from '$/core/components/button';
import Combobox, {
  type ComboboxExtraData,
  type ComboboxOption,
  comboboxComponentUtils,
} from '$/core/components/combobox';
import DynamicFormBuilder, {
  type DynamicFormBuilderFields,
  DynamicFormBuilderFieldType,
  dynamicFormBuilderComponentUtils,
} from '$/core/components/dynamic-form-builder';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import Input from '$/core/components/input';
import Label from '$/core/components/label';
import { type DefaultFormData, formStoreUtils } from '$/core/stores/form.store';
import { ValidationMessageType } from '$/core/utils/validation';

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
  {
    name: 'multipleText',
    label: 'Multiple Text',
    type: DynamicFormBuilderFieldType.TEXT_MULTIPLE,
    required: true,
  },
  {
    name: 'complexObject',
    label: 'Complex Object',
    type: DynamicFormBuilderFieldType.COMPLEX,
    arrayLimit: 1,
    nestedFields: [
      {
        name: 'one',
        label: 'One',
        type: DynamicFormBuilderFieldType.TEXT,
        required: true,
        placeholder: 'Placeholder...',
      },
      {
        name: 'two',
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
        name: 'three',
        label: 'Three',
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
    ],
  },
  {
    name: 'complexObjectArraySingle',
    label: 'Complex Object Array (1 limit)',
    type: DynamicFormBuilderFieldType.COMPLEX_ARRAY,
    arrayLimit: 1,
    required: true,
    nestedFields: [
      {
        name: 'one',
        label: 'One',
        type: DynamicFormBuilderFieldType.TEXT,
        required: true,
        placeholder: 'Placeholder...',
      },
      {
        name: 'two',
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
        name: 'three',
        label: 'Three',
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
      {
        name: 'complexObjectArray',
        label: 'Complex Object (Array)',
        type: DynamicFormBuilderFieldType.COMPLEX_ARRAY,
        nestedFields: [
          {
            name: 'multipleText',
            label: 'Multiple Text',
            type: DynamicFormBuilderFieldType.TEXT_MULTIPLE,
            required: true,
          },
        ],
      },
    ],
  },
  {
    name: 'complexObjectArray',
    label: 'Complex Object (Array)',
    type: DynamicFormBuilderFieldType.COMPLEX_ARRAY,
    required: true,
    nestedFields: [
      {
        name: 'one',
        label: 'One',
        type: DynamicFormBuilderFieldType.TEXT,
        required: true,
        placeholder: 'Placeholder...',
      },
      {
        name: 'two',
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
        name: 'multipleText',
        label: 'Multiple Text',
        type: DynamicFormBuilderFieldType.TEXT_MULTIPLE,
        required: true,
      },
    ],
  },
  {
    name: 'reallyComplexObjectArray',
    label: 'Really Complex Object Array',
    type: DynamicFormBuilderFieldType.COMPLEX_ARRAY,
    arrayLimit: 1,
    required: true,
    nestedFields: [
      {
        name: 'complexArray',
        label: 'Complex Array',
        type: DynamicFormBuilderFieldType.COMPLEX_ARRAY,
        required: true,
        nestedFields: [
          {
            name: 'complex',
            label: 'Complex',
            type: DynamicFormBuilderFieldType.COMPLEX_ARRAY,
            required: true,
            nestedFields: [
              {
                name: 'field1',
                label: 'Field1',
                type: DynamicFormBuilderFieldType.TEXT,
                required: true,
              },
              {
                name: 'field2',
                label: 'Field2',
                type: DynamicFormBuilderFieldType.TEXT_MULTIPLE,
                required: true,
              },
              {
                name: 'field3',
                label: 'Field3',
                type: DynamicFormBuilderFieldType.TEXT,
              },
            ],
          },
        ],
      },
      {
        name: 'condition',
        label: 'Condition',
        type: DynamicFormBuilderFieldType.TEXT,
        required: true,
      },
    ],
  },
];
const formFieldsNoRequired: DynamicFormBuilderFields = formFields.map((field) => {
  const modified = { ...field, required: false };

  if (modified.nestedFields) {
    modified.nestedFields = modified.nestedFields.map((nestedField) => ({
      ...nestedField,
      required: false,
    }));
  }

  return modified;
});
const staticFormSchema = {
  staticField: zod.string().min(1, ValidationMessageType.REQUIRED),
};
const dynamicFieldsSelection: ComboboxOption[] = [
  { label: 'With Validation', value: 1 },
  { label: 'Without Validation', value: 2 },
];
const secretFormFields: DynamicFormBuilderFields = [
  {
    name: 'title',
    label: 'Title',
    type: DynamicFormBuilderFieldType.TEXT,
    required: true,
    isSecret: true,
    placeholder: 'Placeholder...',
  },
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
      <div>data</div>
      <pre>{JSON.stringify(formStore.data(), null, 2)}</pre>
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
      complexObject: {
        one: 'one',
        two: ['1'],
        three: '1',
      },
      complexObjectArray: [
        {
          one: 'two',
          two: ['1'],
          three: '2',
        },
        {
          one: 'three',
          two: ['1'],
          three: '3',
        },
      ],
      reallyComplexObjectArray: [
        {
          complexArray: [
            {
              complex: [
                {
                  field1: '1',
                  field2: ['asd', 'as'],
                  field3: 'asd',
                },
              ],
            },
            {
              complex: [
                {
                  field1: '2',
                  field2: ['asd', 'asd'],
                  field3: 'asd',
                },
              ],
            },
          ],
          condition: 'asd',
        },
      ],
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
          <FormField errors={formStore.errors().dynamicFieldsSelection?.errors}>
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

export const ReadOnly = () => {
  const [currentDynamicFields, setCurrentDynamicFields] = createSignal<DynamicFormBuilderFields>(
    formFields.map((field) => {
      const asRequired = { ...field, readonly: true };

      if (field?.nestedFields) {
        asRequired.nestedFields = field.nestedFields.map((nestedField) => ({
          ...nestedField,
          readonly: true,
        }));
      }

      return asRequired;
    }),
  );

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
      complexObject: {
        one: 'one',
        two: ['1'],
        three: '1',
      },
      complexObjectArray: [
        {
          one: 'two',
          two: ['1'],
          three: '2',
        },
        {
          one: 'three',
          two: ['1'],
          three: '3',
        },
      ],
      reallyComplexObjectArray: [
        {
          complexArray: [
            {
              complex: [
                {
                  field1: '1',
                  field2: ['asd', 'as'],
                  field3: 'asd',
                },
              ],
            },
            {
              complex: [
                {
                  field1: '2',
                  field2: ['asd', 'asd'],
                  field3: 'asd',
                },
              ],
            },
          ],
          condition: 'asd',
        },
      ],
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
          <FormField errors={formStore.errors().dynamicFieldsSelection?.errors}>
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

export const SkipSecretValidation = () => {
  const [skipSecretValidation, setSkipSecretValidation] = createSignal<boolean>(false);

  const formStore = formStoreUtils.createStore<DefaultFormData>({
    onSubmit: (data) => {
      console.log(dynamicFormBuilderComponentUtils.convertData(data, secretFormFields));
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <div data-id="container">
      <Button onClick={() => setSkipSecretValidation(!skipSecretValidation())}>
        {skipSecretValidation() ? 'Skip Secret Validation' : 'Enable Secret Validation'}
      </Button>
      <form use:formDirective>
        <FormFields>
          <DynamicFormBuilder
            fields={secretFormFields}
            formStore={formStore}
            skipSecretValidation={skipSecretValidation()}
          />
          <Button data-id="submit-button" type="submit">
            Submit
          </Button>
        </FormFields>
      </form>
      <div>secret validation enabled: {skipSecretValidation() === true ? 'false' : 'true'}</div>
      <div>data</div>
      <pre>{JSON.stringify(formStore.data(), null, 2)}</pre>
    </div>
  );
};

const groupedFormFields: DynamicFormBuilderFields = [
  {
    name: 'title1',
    label: 'Title1',
    type: DynamicFormBuilderFieldType.TEXT,
    required: false,
    placeholder: 'Placeholder...',
    requiredGroup: 'title',
  },
  {
    name: 'title2',
    label: 'Title2',
    type: DynamicFormBuilderFieldType.TEXT,
    required: false,
    placeholder: 'Placeholder...',
    requiredGroup: 'title',
  },
  {
    name: 'title3',
    label: 'Title3',
    type: DynamicFormBuilderFieldType.TEXT,
    required: false,
    placeholder: 'Placeholder...',
    requiredGroup: 'title',
    requiredGroupValidationMessage: 'Custom required group validation message',
  },
  {
    name: 'test1',
    label: 'Test1',
    type: DynamicFormBuilderFieldType.TEXT,
    required: false,
    placeholder: 'Placeholder...',
    requiredGroup: 'test',
  },
  {
    name: 'test2',
    label: 'Test2',
    type: DynamicFormBuilderFieldType.TEXT,
    required: false,
    placeholder: 'Placeholder...',
    requiredGroup: 'test',
  },
  {
    name: 'test3',
    label: 'Test3',
    type: DynamicFormBuilderFieldType.TEXT,
    required: true,
    placeholder: 'Placeholder...',
  },
  {
    name: 'reallyComplexObjectArray',
    label: 'Really Complex Object Array',
    type: DynamicFormBuilderFieldType.COMPLEX_ARRAY,
    arrayLimit: 1,
    requiredGroup: 'title',
    nestedFields: [
      {
        name: 'complexArray',
        label: 'Complex Array',
        type: DynamicFormBuilderFieldType.COMPLEX_ARRAY,
        required: true,
        nestedFields: [
          {
            name: 'complex',
            label: 'Complex',
            type: DynamicFormBuilderFieldType.COMPLEX_ARRAY,
            required: true,
            nestedFields: [
              {
                name: 'field1',
                label: 'Field1',
                type: DynamicFormBuilderFieldType.TEXT,
                required: true,
              },
              {
                name: 'field2',
                label: 'Field2',
                type: DynamicFormBuilderFieldType.TEXT_MULTIPLE,
                required: true,
              },
              {
                name: 'field3',
                label: 'Field3',
                type: DynamicFormBuilderFieldType.TEXT,
                requiredGroup: 'title',
                requiredGroupValidationMessage: 'Nested custom required group validation message',
              },
            ],
          },
        ],
      },
      {
        name: 'condition',
        label: 'Condition',
        type: DynamicFormBuilderFieldType.TEXT,
        required: true,
      },
    ],
  },
];

export const GroupValidation = () => {
  const formStore = formStoreUtils.createStore<DefaultFormData>({
    onSubmit: (data) => {
      console.log(data);
      console.log(dynamicFormBuilderComponentUtils.convertData(data, groupedFormFields));
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <DynamicFormBuilder fields={groupedFormFields} formStore={formStore} />
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

export const GroupValidationNotRequiredWithInGroup = () => {
  // this validates that even if a field is required, if it is part of a required group, validation should not
  // happen unless of one of the grouped fields has a value
  const fields = groupedFormFields.map((field) => ({
    ...field,
    required: true,
  }));
  const formStore = formStoreUtils.createStore<DefaultFormData>({
    onSubmit: (data) => {
      console.log(data);
      console.log(dynamicFormBuilderComponentUtils.convertData(data, fields));
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <div data-id="container">
      <form use:formDirective>
        <FormFields>
          <DynamicFormBuilder fields={fields} formStore={formStore} />
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
