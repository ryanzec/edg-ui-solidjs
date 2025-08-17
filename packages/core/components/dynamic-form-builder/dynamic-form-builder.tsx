import * as lodash from 'lodash';
import { createEffect, createReaction, createSignal, For, mergeProps, onCleanup, Show } from 'solid-js';
import * as zod from 'zod';
import Checkbox from '$/core/components/checkbox';
import Combobox, {
  type ComboboxOption,
  type ComboboxValueStore,
  comboboxComponentUtils,
} from '$/core/components/combobox';
import styles from '$/core/components/dynamic-form-builder/dynamic-form-builder.module.css';
import DynamicFormBuilderObjectArray from '$/core/components/dynamic-form-builder/dynamic-form-builder-object-array';
import {
  type DynamicFormBuilderFields,
  DynamicFormBuilderFieldType,
  type DynamicFormBuilderProps,
} from '$/core/components/dynamic-form-builder/utils';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import Input from '$/core/components/input';
import Label from '$/core/components/label';
import Radio from '$/core/components/radio';
import Textarea from '$/core/components/textarea';
import type { FormValidatWith, FormWatchReturns } from '$/core/stores/form.store';
import { loggerUtils } from '$/core/utils/logger';
import { stringUtils } from '$/core/utils/string';
import { tailwindUtils } from '$/core/utils/tailwind';
import { ValidationMessageType, validationUtils } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';

const DynamicFormBuilder = <TFormData extends object>(passedProps: DynamicFormBuilderProps<TFormData>) => {
  const props = mergeProps(
    {
      skipSecretValidation: false,
    },
    passedProps,
  );

  const stringTypes: DynamicFormBuilderFieldType[] = [
    DynamicFormBuilderFieldType.TEXT,
    DynamicFormBuilderFieldType.PASSWORD,
    DynamicFormBuilderFieldType.NUMBER,
    DynamicFormBuilderFieldType.RADIO,
    DynamicFormBuilderFieldType.TEXTAREA,
    DynamicFormBuilderFieldType.SELECT,
  ];
  const arrayStringTypes: DynamicFormBuilderFieldType[] = [
    DynamicFormBuilderFieldType.CHECKBOX,
    DynamicFormBuilderFieldType.CHECKBOX_MULTIPLE,
    DynamicFormBuilderFieldType.TEXT_MULTIPLE,
  ];
  const inputTypes: DynamicFormBuilderFieldType[] = [
    DynamicFormBuilderFieldType.TEXT,
    DynamicFormBuilderFieldType.PASSWORD,
    DynamicFormBuilderFieldType.NUMBER,
  ];
  const comboboxTypes: DynamicFormBuilderFieldType[] = [DynamicFormBuilderFieldType.SELECT];

  const [comboboxValueStores, setComboboxValueStores] = createSignal<Record<string, ComboboxValueStore>>({});
  const [comboboxOptions, setComboboxOptions] = createSignal<Record<string, ComboboxOption[]>>({});

  const buildSchemaForFields = (
    fields: DynamicFormBuilderFields,
    fieldPathPrefix: string = '',
  ): {
    schema: Record<string, zod.ZodType>;
    requiredTogether: Record<string, string[]>;
    requiredGroupValidationMessages: Record<string, string>;
  } => {
    let schema: Record<string, zod.ZodType> = {};
    const requiredTogether: Record<string, string[]> = {};
    const requiredGroupValidationMessages: Record<string, string> = {};

    for (const input of fields) {
      if (input.isSecret && props.skipSecretValidation) {
        continue;
      }

      // when it a required group, it is only required when one of the grouped inputs is filled in
      const isRequired = !input.requiredGroup && input.required;
      const fullFieldPath = fieldPathPrefix ? `${fieldPathPrefix}.${input.name}` : input.name;

      if (input.requiredGroup) {
        const group = input.requiredGroup;

        if (!requiredTogether[group]) {
          requiredTogether[group] = [];
        }

        requiredTogether[group].push(fullFieldPath);
        requiredGroupValidationMessages[fullFieldPath] = input.requiredGroupValidationMessage || 'Required';
      }

      if (stringTypes.includes(input.type)) {
        if (isRequired) {
          schema[input.name as string] = zod
            .string()
            .min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED));

          continue;
        }

        schema[input.name as string] = zod.string().optional();

        continue;
      }

      if (arrayStringTypes.includes(input.type)) {
        if (isRequired) {
          schema[input.name as string] = zod
            .array(zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)))
            .min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED));

          continue;
        }

        schema[input.name as string] = zod
          .array(zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)))
          .optional();

        continue;
      }

      if (input.type === DynamicFormBuilderFieldType.COMPLEX) {
        const {
          schema: nestedSchema,
          requiredTogether: nestedRequiredTogether,
          requiredGroupValidationMessages: nestedRequiredGroupValidationMessages,
        } = buildSchemaForFields(input.nestedFields || [], `${fieldPathPrefix}.${input.name}`);

        // @todo(refactor)
        for (const [nestedGroupName, nestedRequiredFieldPaths] of Object.entries(nestedRequiredTogether)) {
          for (const nestedRequiredFieldPath of nestedRequiredFieldPaths) {
            requiredTogether[nestedGroupName] = [...(requiredTogether[nestedGroupName] || []), nestedRequiredFieldPath];
          }
        }

        for (const [nestedFieldPath, nestedRequiredGroupValidationMessage] of Object.entries(
          nestedRequiredGroupValidationMessages,
        )) {
          requiredGroupValidationMessages[nestedFieldPath] = nestedRequiredGroupValidationMessage;
        }

        schema[input.name as string] = zod
          .object({ ...nestedSchema })
          .optional()
          // this will make sure the nested object validation is run and not just at the top level
          .default({});

        continue;
      }

      if (input.type === DynamicFormBuilderFieldType.COMPLEX_ARRAY) {
        const nextFieldPathPrefix = fieldPathPrefix ? `${fieldPathPrefix}.${input.name}.0` : `${input.name}.0`;
        const {
          schema: nestedSchema,
          requiredTogether: nestedRequiredTogether,
          requiredGroupValidationMessages: nestedRequiredGroupValidationMessages,
        } = buildSchemaForFields(input.nestedFields || [], nextFieldPathPrefix);

        // @todo(refactor)
        for (const [nestedGroupName, nestedRequiredFieldPaths] of Object.entries(nestedRequiredTogether)) {
          for (const nestedRequiredFieldPath of nestedRequiredFieldPaths) {
            requiredTogether[nestedGroupName] = [...(requiredTogether[nestedGroupName] || []), nestedRequiredFieldPath];
          }
        }

        for (const [nestedFieldPath, nestedRequiredGroupValidationMessage] of Object.entries(
          nestedRequiredGroupValidationMessages,
        )) {
          requiredGroupValidationMessages[nestedFieldPath] = nestedRequiredGroupValidationMessage;
        }

        if (isRequired) {
          schema[input.name as string] = zod
            .array(
              zod
                .object({ ...nestedSchema })
                .optional()
                // this will make sure the nested object validation is run and not just at the top level
                .default({}),
            )
            .min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED));

          continue;
        }

        schema[input.name as string] = zod
          .array(
            zod
              .object({ ...nestedSchema })
              .optional()
              // this will make sure the nested object validation is run and not just at the top level
              .default({}),
          )
          .optional();
      }
    }

    // since nested complex fields can be linked to fields higher up in the form, we need to until the entire form
    // is built before we can know how to refine the schema for grouped fields
    if (fieldPathPrefix === '') {
      for (const [_groupName, requiredFieldPaths] of Object.entries(requiredTogether)) {
        for (const requiredFieldPath of requiredFieldPaths) {
          const [topLevelField, restOfPath] = stringUtils.splitOnce(requiredFieldPath, '.');
          const fieldSchema = !restOfPath ? schema[topLevelField] : zodUtils.getNestedSchema(requiredFieldPath, schema);

          schema = zodUtils.setNestedSchema(
            requiredFieldPath,
            schema,
            fieldSchema.refine(
              (currentValue) => {
                const neededValues = requiredFieldPaths.some((fieldPath) => {
                  const value = props.formStore.getFieldValue(fieldPath as keyof TFormData);

                  if (!value) {
                    loggerUtils.warn({
                      type: 'form-value-not-found',
                      fieldPath,
                    });

                    // force validation is the field value accessor is not found will make typos easier to notice
                    return true;
                  }

                  return validationUtils.isPopulatedFormValue(value());
                });

                if (!neededValues) {
                  return true;
                }

                return validationUtils.isPopulatedFormValue(currentValue);
              },
              {
                message: requiredGroupValidationMessages[requiredFieldPath],
              },
            ),
          );
        }
      }
    }

    return { schema, requiredTogether, requiredGroupValidationMessages };
  };

  createEffect(function buildFormSchema() {
    if (props.namePrefix) {
      return;
    }

    // const time = performance.now();
    const staticSchema: Record<string, zod.ZodType> = {
      ...props.staticFormSchema,
    };
    const { schema: dynamicSchema, requiredTogether } = buildSchemaForFields(props.fields);
    const finalSchema = zod.object({ ...staticSchema, ...dynamicSchema });

    const validateWith: FormValidatWith<TFormData> = {};

    for (const requiredFieldPaths of Object.values(requiredTogether)) {
      for (const requiredFieldPath of requiredFieldPaths) {
        validateWith[requiredFieldPath as keyof TFormData] = requiredFieldPaths.filter(
          (path) => path !== requiredFieldPath,
        ) as (keyof TFormData)[];
      }
    }

    // @ts-expect-error don't know how of even if it is possible for typescript to understand this code so f-it
    props.formStore.setSchema(zodUtils.schemaForType<TFormData>()(finalSchema));
    props.formStore.setValidateWith(validateWith);
    // console.log('building', performance.now() - time);
  });

  const buildComboboxesForFields = (fields: DynamicFormBuilderFields, fieldPathPrefix: string = '') => {
    let newComboboxValueStores: Record<string, ComboboxValueStore> = {};
    let newComboboxOptions: Record<string, ComboboxOption[]> = {};

    for (const input of fields) {
      const fieldPrefix = fieldPathPrefix ? fieldPathPrefix : props.namePrefix;
      const fieldName = fieldPrefix ? `${fieldPrefix}.${input.name}` : input.name;

      if (comboboxTypes.includes(input.type)) {
        newComboboxValueStores[fieldName] = comboboxComponentUtils.createValueStore();
        newComboboxOptions[fieldName] = input.options || [];
      }

      if (input.nestedFields) {
        const { newComboboxValueStores: nestedComboboxValueStores, newComboboxOptions: nestedComboboxOptions } =
          buildComboboxesForFields(input.nestedFields, fieldName);

        newComboboxValueStores = { ...newComboboxValueStores, ...nestedComboboxValueStores };
        newComboboxOptions = { ...newComboboxOptions, ...nestedComboboxOptions };
      }
    }

    return { newComboboxValueStores, newComboboxOptions };
  };

  createEffect(function buildComboboxValueStores() {
    const { newComboboxValueStores, newComboboxOptions } = buildComboboxesForFields(props.fields);

    setComboboxValueStores(newComboboxValueStores);
    setComboboxOptions(newComboboxOptions);
  });

  const initializeComboboxValues = createReaction(() => {
    const comboboxFieldNames = Object.keys(comboboxValueStores());

    if (!props.formStore || props.fields.length === 0 || comboboxFieldNames.length === 0) {
      initializeComboboxValues(() => comboboxValueStores());
    }

    const formData = props.formStore.data();

    for (const fieldName of comboboxFieldNames) {
      const fieldStructure = props.fields.find((field) => field.name === fieldName);

      // @ts-expect-error don't know how of even if it is possible for typescript to understand this code so f-it
      const selectedValue = formData[fieldName];

      if (!selectedValue) {
        continue;
      }

      const selectedLabel =
        fieldStructure?.options?.find((option) => option.value === selectedValue)?.label || selectedValue;

      comboboxValueStores()[fieldName].setSelected([
        {
          value: selectedValue,
          label: selectedLabel,
        },
      ]);
    }
  });

  initializeComboboxValues(() => comboboxValueStores());

  const formWarchSubscription = props.formStore.watch((name, data) => {
    const currentComboboxValueStore = comboboxValueStores()[name as string];
    const currentComboboxOptions = comboboxOptions()[name as string];

    if (!currentComboboxValueStore) {
      return;
    }

    const selectedValue = props.formStore.getFieldValue(name);

    if (!selectedValue) {
      currentComboboxValueStore.setSelected([]);

      return;
    }

    const selectedOption = currentComboboxOptions.find((option) => option.value === selectedValue());

    if (!selectedOption) {
      currentComboboxValueStore.setSelected([]);

      return;
    }

    currentComboboxValueStore.setSelected([selectedOption]);
  });

  onCleanup(() => {
    formWarchSubscription.unsubscribe();
  });

  return (
    <FormFields
      class={tailwindUtils.merge({
        [styles.enclosedForm]: props.encloseForm,
      })}
    >
      <For each={props.fields}>
        {(field) => {
          // since we need this as a keyof TFormData more often, casting here and then casting as a string as needed below
          const fieldName = (props.namePrefix ? `${props.namePrefix}.${field.name}` : field.name) as keyof TFormData;

          const getFieldError = (): string[] => {
            // console.log(props.formStore.errors());
            return (lodash.get(props.formStore.errors(), `${fieldName as string}.errors`) || []) as string[];
          };

          return (
            <FormField errors={getFieldError()}>
              <Show when={field.label}>
                <Label>{field.label}</Label>
              </Show>
              <Show when={inputTypes.includes(field.type)}>
                <Input
                  type={field.type}
                  name={fieldName}
                  formData={props.formStore.data}
                  placeholder={field.isSecret && props.skipSecretValidation ? '********' : field.placeholder}
                  readonly={field.readonly ?? false}
                  disabled={props.disabled}
                />
              </Show>
              <Show when={field.type === DynamicFormBuilderFieldType.TEXTAREA}>
                <Textarea
                  name={fieldName}
                  formData={props.formStore.data}
                  placeholder={field.placeholder}
                  readonly={field.readonly ?? false}
                  disabled={props.disabled}
                />
              </Show>
              <Show when={field.type === DynamicFormBuilderFieldType.RADIO}>
                <Radio.Group>
                  <For each={field.options}>
                    {(option) => {
                      return (
                        <Radio
                          labelElement={option.label}
                          name={fieldName}
                          value={option.value}
                          formData={props.formStore.data}
                          readonly={field.readonly ?? false}
                          disabled={props.disabled}
                        />
                      );
                    }}
                  </For>
                </Radio.Group>
              </Show>
              <Show
                when={
                  field.type === DynamicFormBuilderFieldType.CHECKBOX ||
                  field.type === DynamicFormBuilderFieldType.CHECKBOX_MULTIPLE
                }
              >
                <Checkbox.Group>
                  <For each={field.options}>
                    {(option) => {
                      return (
                        <Checkbox
                          labelElement={option.label}
                          name={fieldName}
                          value={option.value}
                          formData={props.formStore.data}
                          readonly={field.readonly ?? false}
                          disabled={props.disabled}
                        />
                      );
                    }}
                  </For>
                </Checkbox.Group>
              </Show>
              <Show
                when={field.type === DynamicFormBuilderFieldType.SELECT && comboboxValueStores()[fieldName as string]}
              >
                <Combobox
                  forceSelection
                  autoShowOptions
                  options={comboboxOptions()[fieldName as string] || []}
                  setSelected={(options: ComboboxOption[]) => {
                    props.formStore.setValue(fieldName, options[0]?.value ?? '');
                    comboboxValueStores()[fieldName as string].setSelected(options);
                  }}
                  selected={comboboxValueStores()[fieldName as string].selected()}
                  placeholder={field.placeholder}
                  name={fieldName as keyof TFormData}
                  selectableComponent={Combobox.SelectableOption}
                  formData={props.formStore.data}
                  disabled={props.disabled || field.readonly || false}
                />
              </Show>
              <Show when={field.type === DynamicFormBuilderFieldType.TEXT_MULTIPLE}>
                <Input.Multiple formStore={props.formStore} fieldName={fieldName} disabled={props.disabled} />
              </Show>
              <Show when={field.type === DynamicFormBuilderFieldType.COMPLEX}>
                <DynamicFormBuilder
                  namePrefix={fieldName as string}
                  fields={field.nestedFields || []}
                  formStore={props.formStore}
                  encloseForm
                  disabled={props.disabled}
                />
              </Show>
              <Show when={field.type === DynamicFormBuilderFieldType.COMPLEX_ARRAY}>
                <DynamicFormBuilderObjectArray
                  // while this might seem weird (and it is), it is being done to avoid circular dependency issues
                  DynamicFormBuilderComponent={DynamicFormBuilder}
                  fieldName={fieldName}
                  formStore={props.formStore}
                  nestedFields={field.nestedFields}
                  countLimit={field.arrayLimit}
                  disabled={props.disabled}
                />
              </Show>
            </FormField>
          );
        }}
      </For>
    </FormFields>
  );
};

export default DynamicFormBuilder;
