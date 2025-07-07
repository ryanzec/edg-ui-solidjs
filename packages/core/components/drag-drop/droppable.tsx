import { dragDropDataAttribute } from '$/core/components/drag-drop/utils';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { type JSX, onCleanup } from 'solid-js';

export type DroppableProps = JSX.HTMLAttributes<HTMLDivElement> & {
  id: string;
};

const Droppable = (props: DroppableProps) => {
  const droppableElementRef = (element: HTMLElement) => {
    const droppableCleanup = dropTargetForElements({
      element,
      getData: () => ({
        droppableId: props.id,
      }),
      getDropEffect: () => 'move',
      onDragEnter: ({ self }) => {
        (self.element as HTMLElement).setAttribute(dragDropDataAttribute.IS_DROPPING, 'true');
      },
      onDragLeave: ({ self }) => {
        (self.element as HTMLElement).removeAttribute(dragDropDataAttribute.IS_DROPPING);
      },
      onDrop: ({ self }) => {
        (self.element as HTMLElement).removeAttribute(dragDropDataAttribute.IS_DROPPING);
      },
    });

    onCleanup(() => {
      droppableCleanup();
    });
  };

  return (
    <div ref={droppableElementRef} class={props.class}>
      {props.children}
    </div>
  );
};

export default Droppable;
