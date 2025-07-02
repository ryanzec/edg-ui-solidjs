import type { DynamicFormBuilderProps } from '$/core/components/dynamic-form-builder/utils';
import FormArrayAddContainer, { FormArray } from '$/core/components/form-array';
import { type Accessor, type Component, Index } from 'solid-js';

type DynamicFormBuilderObjectArrayProps<TFormData extends object> = {
  fieldName: keyof TFormData;
  nestedFields?: DynamicFormBuilderProps<TFormData>['fields'];
  countLimit?: number;
  DynamicFormBuilderComponent: Component<DynamicFormBuilderProps<TFormData>>;
} & Pick<DynamicFormBuilderProps<TFormData>, 'formStore'>;

const DynamicFormBuilderObjectArray = <TFormData extends object>(
  props: DynamicFormBuilderObjectArrayProps<TFormData>,
) => {
  const values = props.formStore.getFieldValue(props.fieldName) as Accessor<TFormData[]>;

  return (
    <FormArrayAddContainer
      hideAddButton={values()?.length >= (props.countLimit ?? 999999)}
      onAdd={() => props.formStore.addArrayField(props.fieldName, {})}
      addLabel="Add"
      class={`field-container-${((props.fieldName as string) || '').replaceAll('.', '_')}`}
    >
      <Index each={values()}>
        {(_item, index) => {
          return (
            <FormArray.Item encloseItem onDelete={() => props.formStore.removeArrayField(props.fieldName, index)}>
              <props.DynamicFormBuilderComponent
                namePrefix={`${props.fieldName as string}.${index}`}
                fields={props.nestedFields || []}
                formStore={props.formStore}
              />
            </FormArray.Item>
          );
        }}
      </Index>
    </FormArrayAddContainer>
  );
};

export default DynamicFormBuilderObjectArray;
