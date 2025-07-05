import Chart, { chartComponentUtils } from '$/core/components/chart';
import { dragDropComponentUtils } from '$/core/components/drag-drop';
import DragDropLayout from '$/core/components/drag-drop-layout';
import styles from '$/core/components/drag-drop-layout/drag-drop-layout.sandbox.module.css';
import Icon, { IconSize } from '$/core/components/icon';
import { tailwindUtils } from '$/core/utils/tailwind';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
import type { ChartData } from 'chart.js';
import { createSignal } from 'solid-js';
import * as uuid from 'uuid';

export default {
  title: 'Components/DragDropLayout',
};

type DataPoint = {
  id: string;
  label: string;
  value: number;
};

const buildChartData = (count: number): DataPoint[] => {
  const rawData: DataPoint[] = [];

  for (let i = 0; i < count; i++) {
    rawData.push({ id: uuid.v4(), label: `Label${i + 1}`, value: Math.floor(Math.random() * 1000) + 100 });
  }

  return rawData;
};

export const Default = () => {
  const barRawData = buildChartData(160);
  const lineRawData = buildChartData(16);
  const radarRawData = buildChartData(16);

  const barChartStore = chartComponentUtils.createStore();
  const lineChartStore = chartComponentUtils.createStore();
  const radarChartStore = chartComponentUtils.createStore();

  const [barChartData] = createSignal<ChartData<'bar'>>({
    labels: barRawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultBarDatasetOptions(barRawData.length),
        label: 'Value',
        data: barRawData.map((row) => row.value),
      },
    ],
  });

  const [lineChartData] = createSignal<ChartData<'line'>>({
    labels: lineRawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultLineDatasetOptions(lineRawData.length),
        label: 'Value',
        data: lineRawData.map((row) => row.value),
      },
    ],
  });

  const [radarChartData] = createSignal<ChartData<'radar'>>({
    labels: radarRawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultRadarDatasetOptions(radarRawData.length),
        label: 'Value',
        data: radarRawData.map((row) => row.value),
      },
    ],
  });

  const dragDropStore = dragDropComponentUtils.createSingleListStore({
    defaultElements: [
      {
        id: '1',
        element: () => <Chart.Bar chartStore={barChartStore} data={barChartData()} />,
      },
      {
        id: '2',
        element: () => <Chart.Line chartStore={lineChartStore} data={lineChartData()} />,
      },
      {
        id: '3',
        element: () => <Chart.Radar chartStore={radarChartStore} data={radarChartData()} />,
      },
      {
        id: '4',
        element: () => <div class={styles.data4}>D</div>,
      },
    ],
  });

  const droppableId1 = 'layout1';

  return (
    <SandboxExamplesContainer>
      <DragDropLayout dragDropSingleListStore={dragDropStore} droppableId={droppableId1}>
        <DragDropLayout.Slot
          class={tailwindUtils.merge(styles.slot)}
          contentClass={tailwindUtils.merge(styles.slot1)}
          draggableId={dragDropStore.elements()[0].id}
          droppableId={droppableId1}
        >
          {dragDropStore.elements()[0].element()}
        </DragDropLayout.Slot>
        <div class={styles.middle}>
          <DragDropLayout.Slot
            class={tailwindUtils.merge(styles.slot)}
            contentClass={tailwindUtils.merge(styles.slot2)}
            draggableId={dragDropStore.elements()[1].id}
            droppableId={droppableId1}
          >
            {dragDropStore.elements()[1].element()}
          </DragDropLayout.Slot>
          <DragDropLayout.Slot
            class={tailwindUtils.merge(styles.slot)}
            contentClass={tailwindUtils.merge(styles.slot3)}
            draggableId={dragDropStore.elements()[2].id}
            droppableId={droppableId1}
          >
            {dragDropStore.elements()[2].element()}
          </DragDropLayout.Slot>
        </div>
        <DragDropLayout.Slot
          class={tailwindUtils.merge(styles.slot)}
          contentClass={tailwindUtils.merge(styles.slot4)}
          draggableId={dragDropStore.elements()[3].id}
          droppableId={droppableId1}
        >
          {dragDropStore.elements()[3].element()}
        </DragDropLayout.Slot>
      </DragDropLayout>
    </SandboxExamplesContainer>
  );
};

export const MultipleSamePage = () => {
  const barRawData = buildChartData(160);
  const lineRawData = buildChartData(16);
  const radarRawData = buildChartData(16);

  const barChartStore = chartComponentUtils.createStore();
  const lineChartStore = chartComponentUtils.createStore();
  const radarChartStore = chartComponentUtils.createStore();

  const [barChartData] = createSignal<ChartData<'bar'>>({
    labels: barRawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultBarDatasetOptions(barRawData.length),
        label: 'Value',
        data: barRawData.map((row) => row.value),
      },
    ],
  });

  const [lineChartData] = createSignal<ChartData<'line'>>({
    labels: lineRawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultLineDatasetOptions(lineRawData.length),
        label: 'Value',
        data: lineRawData.map((row) => row.value),
      },
    ],
  });

  const [radarChartData] = createSignal<ChartData<'radar'>>({
    labels: radarRawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultRadarDatasetOptions(radarRawData.length),
        label: 'Value',
        data: radarRawData.map((row) => row.value),
      },
    ],
  });

  const dragDropStore = dragDropComponentUtils.createSingleListStore({
    defaultElements: [
      {
        id: '1',
        element: () => <Chart.Bar chartStore={barChartStore} data={barChartData()} />,
      },
      {
        id: '2',
        element: () => <Chart.Line chartStore={lineChartStore} data={lineChartData()} />,
      },
      {
        id: '3',
        element: () => <Chart.Radar chartStore={radarChartStore} data={radarChartData()} />,
      },
      {
        id: '4',
        element: () => <div class={styles.data4}>D</div>,
      },
    ],
  });

  const dragDropStore2 = dragDropComponentUtils.createSingleListStore({
    defaultElements: [
      {
        id: '1',
        element: () => <Chart.Bar chartStore={barChartStore} data={barChartData()} />,
      },
      {
        id: '2',
        element: () => <Chart.Line chartStore={lineChartStore} data={lineChartData()} />,
      },
      {
        id: '3',
        element: () => <Chart.Radar chartStore={radarChartStore} data={radarChartData()} />,
      },
      {
        id: '4',
        element: () => <div class={styles.data4}>D</div>,
      },
    ],
  });

  const droppableId1 = 'layout1';
  const droppableId2 = 'layout2';

  return (
    <SandboxExamplesContainer>
      <DragDropLayout dragDropSingleListStore={dragDropStore} droppableId={droppableId1}>
        <DragDropLayout.Slot
          class={tailwindUtils.merge(styles.slot)}
          contentClass={tailwindUtils.merge(styles.slot1)}
          draggableId={dragDropStore.elements()[0].id}
          droppableId={droppableId1}
        >
          {dragDropStore.elements()[0].element()}
        </DragDropLayout.Slot>
        <div class={styles.middle}>
          <DragDropLayout.Slot
            class={tailwindUtils.merge(styles.slot)}
            contentClass={tailwindUtils.merge(styles.slot2)}
            draggableId={dragDropStore.elements()[1].id}
            droppableId={droppableId1}
          >
            {dragDropStore.elements()[1].element()}
          </DragDropLayout.Slot>
          <DragDropLayout.Slot
            class={tailwindUtils.merge(styles.slot)}
            contentClass={tailwindUtils.merge(styles.slot3)}
            draggableId={dragDropStore.elements()[2].id}
            droppableId={droppableId1}
          >
            {dragDropStore.elements()[2].element()}
          </DragDropLayout.Slot>
        </div>
        <DragDropLayout.Slot
          class={tailwindUtils.merge(styles.slot)}
          contentClass={tailwindUtils.merge(styles.slot4)}
          draggableId={dragDropStore.elements()[3].id}
          droppableId={droppableId1}
        >
          {dragDropStore.elements()[3].element()}
        </DragDropLayout.Slot>
      </DragDropLayout>
      <hr />
      <DragDropLayout dragDropSingleListStore={dragDropStore2} droppableId={droppableId2}>
        <DragDropLayout.Slot
          class={tailwindUtils.merge(styles.slot)}
          contentClass={tailwindUtils.merge(styles.slot1)}
          draggableId={dragDropStore2.elements()[0].id}
          droppableId={droppableId2}
        >
          {dragDropStore2.elements()[0].element()}
        </DragDropLayout.Slot>
        <div class={styles.middle}>
          <DragDropLayout.Slot
            class={tailwindUtils.merge(styles.slot)}
            contentClass={tailwindUtils.merge(styles.slot2)}
            draggableId={dragDropStore2.elements()[1].id}
            droppableId={droppableId2}
          >
            {dragDropStore2.elements()[1].element()}
          </DragDropLayout.Slot>
          <DragDropLayout.Slot
            class={tailwindUtils.merge(styles.slot)}
            contentClass={tailwindUtils.merge(styles.slot3)}
            draggableId={dragDropStore2.elements()[2].id}
            droppableId={droppableId2}
          >
            {dragDropStore2.elements()[2].element()}
          </DragDropLayout.Slot>
        </div>
        <DragDropLayout.Slot
          class={tailwindUtils.merge(styles.slot)}
          contentClass={tailwindUtils.merge(styles.slot4)}
          draggableId={dragDropStore2.elements()[3].id}
          droppableId={droppableId2}
        >
          {dragDropStore2.elements()[3].element()}
        </DragDropLayout.Slot>
      </DragDropLayout>
    </SandboxExamplesContainer>
  );
};

export const WithEmptySlot = () => {
  const barRawData = buildChartData(160);
  const radarRawData = buildChartData(16);

  const barChartStore = chartComponentUtils.createStore();
  const radarChartStore = chartComponentUtils.createStore();

  const [barChartData] = createSignal<ChartData<'bar'>>({
    labels: barRawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultBarDatasetOptions(barRawData.length),
        label: 'Value',
        data: barRawData.map((row) => row.value),
      },
    ],
  });

  const [radarChartData] = createSignal<ChartData<'radar'>>({
    labels: radarRawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultRadarDatasetOptions(radarRawData.length),
        label: 'Value',
        data: radarRawData.map((row) => row.value),
      },
    ],
  });

  const dragDropStore = dragDropComponentUtils.createSingleListStore({
    defaultElements: [
      {
        id: '1',
        element: () => <Chart.Bar chartStore={barChartStore} data={barChartData()} />,
      },
      {
        id: '2',
        element: () => undefined,
      },
      {
        id: '3',
        element: () => <Chart.Radar chartStore={radarChartStore} data={radarChartData()} />,
      },
      {
        id: '4',
        element: () => <div class={styles.data4}>D</div>,
      },
    ],
  });

  const droppableId1 = 'layout1';

  return (
    <SandboxExamplesContainer>
      <DragDropLayout dragDropSingleListStore={dragDropStore} droppableId={droppableId1}>
        <DragDropLayout.Slot
          class={tailwindUtils.merge(styles.slot)}
          contentClass={tailwindUtils.merge(styles.slot1)}
          draggableId={dragDropStore.elements()[0].id}
          droppableId={droppableId1}
        >
          {dragDropStore.elements()[0].element()}
        </DragDropLayout.Slot>
        <div class={styles.middle}>
          <DragDropLayout.Slot
            class={tailwindUtils.merge(styles.slot)}
            contentClass={tailwindUtils.merge(styles.slot2)}
            draggableId={dragDropStore.elements()[1].id}
            droppableId={droppableId1}
          >
            {dragDropStore.elements()[1].element()}
          </DragDropLayout.Slot>
          <DragDropLayout.Slot
            class={tailwindUtils.merge(styles.slot)}
            contentClass={tailwindUtils.merge(styles.slot3)}
            draggableId={dragDropStore.elements()[2].id}
            droppableId={droppableId1}
          >
            {dragDropStore.elements()[2].element()}
          </DragDropLayout.Slot>
        </div>
        <DragDropLayout.Slot
          class={tailwindUtils.merge(styles.slot)}
          contentClass={tailwindUtils.merge(styles.slot4)}
          draggableId={dragDropStore.elements()[3].id}
          droppableId={droppableId1}
        >
          {dragDropStore.elements()[3].element()}
        </DragDropLayout.Slot>
      </DragDropLayout>
    </SandboxExamplesContainer>
  );
};

export const WithHandles = () => {
  const barRawData = buildChartData(160);
  const radarRawData = buildChartData(16);

  const barChartStore = chartComponentUtils.createStore();
  const radarChartStore = chartComponentUtils.createStore();

  const [barChartData] = createSignal<ChartData<'bar'>>({
    labels: barRawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultBarDatasetOptions(barRawData.length),
        label: 'Value',
        data: barRawData.map((row) => row.value),
      },
    ],
  });

  const [radarChartData] = createSignal<ChartData<'radar'>>({
    labels: radarRawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultRadarDatasetOptions(radarRawData.length),
        label: 'Value',
        data: radarRawData.map((row) => row.value),
      },
    ],
  });

  const dragDropStore = dragDropComponentUtils.createSingleListStore({
    defaultElements: [
      {
        id: '1',
        element: () => (
          <div class={styles.chartLayoutSlot}>
            <Icon
              class={styles.listItemDragHandle}
              data-drag-handle="true"
              icon="dots-six-vertical"
              size={IconSize.BASE}
            />
            <div class={styles.chartContainer}>
              <Chart.Bar chartStore={barChartStore} data={barChartData()} />
            </div>
          </div>
        ),
      },
      {
        id: '2',
        element: () => undefined,
      },
      {
        id: '3',
        element: () => (
          <div class={styles.chartLayoutSlot}>
            <Icon
              class={styles.listItemDragHandle}
              data-drag-handle="true"
              icon="dots-six-vertical"
              size={IconSize.BASE}
            />
            <div class={styles.chartContainer}>
              <Chart.Radar chartStore={radarChartStore} data={radarChartData()} />
            </div>
          </div>
        ),
      },
      {
        id: '4',
        element: () => (
          <div class={styles.data4}>
            <Icon
              class={styles.listItemDragHandle}
              data-drag-handle="true"
              icon="dots-six-vertical"
              size={IconSize.BASE}
            />
            <div>
              <input type="test" />
            </div>
          </div>
        ),
      },
    ],
  });

  const droppableId1 = 'layout1';

  return (
    <SandboxExamplesContainer>
      <DragDropLayout dragDropSingleListStore={dragDropStore} droppableId={droppableId1}>
        <DragDropLayout.Slot
          class={tailwindUtils.merge(styles.slot)}
          contentClass={tailwindUtils.merge(styles.slot1)}
          draggableId={dragDropStore.elements()[0].id}
          droppableId={droppableId1}
        >
          {dragDropStore.elements()[0].element()}
        </DragDropLayout.Slot>
        <div class={styles.middle}>
          <DragDropLayout.Slot
            class={tailwindUtils.merge(styles.slot)}
            contentClass={tailwindUtils.merge(styles.slot2)}
            draggableId={dragDropStore.elements()[1].id}
            droppableId={droppableId1}
          >
            {dragDropStore.elements()[1].element()}
          </DragDropLayout.Slot>
          <DragDropLayout.Slot
            class={tailwindUtils.merge(styles.slot)}
            contentClass={tailwindUtils.merge(styles.slot3)}
            draggableId={dragDropStore.elements()[2].id}
            droppableId={droppableId1}
          >
            {dragDropStore.elements()[2].element()}
          </DragDropLayout.Slot>
        </div>
        <DragDropLayout.Slot
          class={tailwindUtils.merge(styles.slot)}
          contentClass={tailwindUtils.merge(styles.slot4)}
          draggableId={dragDropStore.elements()[3].id}
          droppableId={droppableId1}
        >
          {dragDropStore.elements()[3].element()}
        </DragDropLayout.Slot>
      </DragDropLayout>
    </SandboxExamplesContainer>
  );
};
