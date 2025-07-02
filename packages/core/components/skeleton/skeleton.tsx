import styles from '$/core/components/skeleton/skeleton.module.css';
import classnames from 'classnames';
import { type JSX, mergeProps, splitProps } from 'solid-js';

export type SkeletonProps = JSX.HTMLAttributes<HTMLDivElement> & {
  barCount?: number;

  // variable length just gives different widths but they are consistent (so not to have the user keep seeing
  // different widths)
  variableLength?: boolean;
};

const variableLengthClasses = [
  styles.variableLength1,
  styles.variableLength2,
  styles.variableLength3,
  styles.variableLength4,
  styles.variableLength5,
];

const Skeleton = (passedProps: SkeletonProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ barCount: 5, variableLength: false }, passedProps), [
    'class',
    'barCount',
    'variableLength',
  ]);
  const barElements: JSX.Element[] = [];

  for (let i = 0; i < props.barCount; i++) {
    const variableLengthIndex = i % variableLengthClasses.length;

    barElements.push(
      <div
        class={classnames(styles.bar, {
          [variableLengthClasses[variableLengthIndex]]: props.variableLength,
        })}
      />,
    );
  }

  return (
    <div data-id="skeleton" class={classnames(props.class, styles.container)} {...restOfProps}>
      {barElements}
    </div>
  );
};

export default Skeleton;
