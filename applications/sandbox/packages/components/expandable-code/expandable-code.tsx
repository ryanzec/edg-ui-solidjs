import { createSignal, type JSX, mergeProps, Show, splitProps } from 'solid-js';

import Button from '$/core/components/button';

type ExpandableCodeProps = JSX.ButtonHTMLAttributes<HTMLDivElement> & {
  label: string;
};

const ExpandableCode = (passedProps: ExpandableCodeProps) => {
  const [props, restOfProsp] = splitProps(
    mergeProps(
      {
        label: '',
      },
      passedProps,
    ),
    ['label', 'children'],
  );
  const [toggle, setToggle] = createSignal(true);

  return (
    <div {...restOfProsp}>
      <div>{props.label}</div>
      <Button onClick={() => setToggle(!toggle())}>Toggle</Button>
      <Show when={toggle()}>
        <pre>{props.children}</pre>
      </Show>
    </div>
  );
};

export default ExpandableCode;
