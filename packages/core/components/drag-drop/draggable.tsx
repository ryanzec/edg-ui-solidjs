import { dragDropDataAttribute } from '$/core/components/drag-drop/utils';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { CleanupFn } from '@atlaskit/pragmatic-drag-and-drop/types';
import { type JSX, createSignal, onCleanup, onMount } from 'solid-js';

export type DraggableProps = JSX.HTMLAttributes<HTMLDivElement> & {
  draggableId: string;
  droppableId?: string;
  isDroppable?: boolean;
};

const Draggable = (props: DraggableProps) => {
  const [elementRef, setElementRef] = createSignal<HTMLDivElement | undefined>();

  const setupDraggable = (dragElement: HTMLDivElement): CleanupFn => {
    const dragHandleElement = dragElement.querySelector(`[${dragDropDataAttribute.DRAG_HANDLE}="true"]`);

    return draggable({
      element: dragElement,
      dragHandle: (dragHandleElement as Element) ?? null,
      getInitialData: () => ({
        draggableId: props.draggableId,
        droppableId: props.droppableId,
      }),
      onDragStart: ({ source }) => {
        source.element.setAttribute(dragDropDataAttribute.IS_DRAGGING, 'true');
      },
      onDrop: ({ source }) => {
        source.element.removeAttribute(dragDropDataAttribute.IS_DRAGGING);
      },
    });
  };

  onMount(() => {
    const currentElement = elementRef();

    if (!currentElement) {
      return;
    }

    let cleanupDraggable: CleanupFn | undefined = setupDraggable(currentElement);
    let cleanupDroppable: CleanupFn | undefined = undefined;

    if (props.isDroppable) {
      cleanupDroppable = dropTargetForElements({
        element: currentElement,
        getData: () => ({
          draggableId: props.draggableId,
          droppableId: props.droppableId,
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
    }

    // there are cases when the draggable slots do not change when items are re-positioned with drag and drop (for
    // example, a drag drop layout might have a static layout where the content in the draggables might change but
    // the draggable slots itself are fixed) and in those cases, the content might hold a draggable handle. when
    // that happens we need to re-create the draggable so that the draggable handle is associated to the correct
    // draggable slot so to do this, we re-create the draggable whenever the draggable slots content changes
    const domObserver = new MutationObserver((mutationList) => {
      cleanupDraggable?.();

      cleanupDraggable = setupDraggable(currentElement);
    });

    domObserver.observe(currentElement, {
      // as long as we don't change these settings, the performance of re-creating the draggable in the observer
      // should be fine (since it only happens when nodes are added / removed) however if we update this in include
      // attributes changing or data changing, we might need to refactor the observer to only re-create the
      // draggable when relevant change are detected
      childList: true,
      subtree: true,
    });

    onCleanup(() => {
      cleanupDraggable?.();
      cleanupDroppable?.();
      domObserver.disconnect();
    });
  });

  return (
    <div
      ref={setElementRef}
      class={props.class}
      data-is-draggable="true"
      data-is-droppable={props.isDroppable && props.droppableId ? 'true' : 'false'}
    >
      {props.children}
    </div>
  );
};

export default Draggable;
