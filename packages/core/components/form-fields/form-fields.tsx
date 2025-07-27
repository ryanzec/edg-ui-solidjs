import { type JSX, splitProps } from 'solid-js';
import styles from '$/core/components/form-fields/form-fields.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';

export type FormFieldsProps = JSX.HTMLAttributes<HTMLDivElement>;

const FormFields = (passedProps: FormFieldsProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'children']);
  return (
    <div data-id="form-fields" {...restOfProps} class={tailwindUtils.merge(props.class, styles.formFields)}>
      {props.children}
    </div>
  );
};

export default FormFields;
