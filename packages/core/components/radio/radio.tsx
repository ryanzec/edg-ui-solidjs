import { type Accessor, createSignal, type JSX, splitProps } from 'solid-js';
import Icon from '$/core/components/icon';
import styles from '$/core/components/radio/radio.module.css';
import type { DefaultFormData } from '$/core/stores/form.store';
import { tailwindUtils } from '$/core/utils/tailwind';

export type RadioProps<TFormData = DefaultFormData> = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  labelElement: JSX.Element;
  alignEnd?: boolean;
  name?: keyof TFormData;

  // while not directly used, used to infer the type for name to give properly type checking on that property
  formData?: Accessor<Partial<TFormData>>;
};

const Radio = <TFormData = DefaultFormData>(passedProps: RadioProps<TFormData>) => {
  const [props, restOfProps] = splitProps(passedProps, [
    'class',
    'labelElement',
    'alignEnd',
    'onSelect',
    'name',
    'formData',
  ]);

  // we need to manually track the checked state of the input as the check state effects styling
  const [isChecked, setIsChecked] = createSignal(restOfProps.checked);
  const [inputElementRef, setInputElementRef] = createSignal<HTMLInputElement>();

  const handleSelect: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    setIsChecked(checked);

    if (props.onSelect) {
      const eventHandler = props.onSelect as JSX.EventHandler<HTMLInputElement, Event>;

      eventHandler(event);
    }
  };

  const handleClickIcon = () => {
    inputElementRef()?.click();
  };

  return (
    <span
      class={tailwindUtils.merge(styles.radio, props.class, {
        [styles.alignEnd]: props.alignEnd,
      })}
    >
      <label>
        <input
          data-id="radio"
          {...restOfProps}
          type="radio"
          name={props.name as string}
          onChange={handleSelect}
          ref={setInputElementRef}
        />
        <Icon
          class={tailwindUtils.merge(styles.icon, {
            [styles.iconIsChecked]: isChecked(),
          })}
          icon={isChecked() ? 'check-circle' : 'circle'}
          onClick={handleClickIcon}
        />
        <span class={styles.label}>{props.labelElement}</span>
      </label>
    </span>
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default Radio;
