import Chart, { chartComponentUtils } from '$/core/components/chart';
import styles from '$/core/components/chart/chart.sandbox.module.css';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
import type { ChartOptions } from 'chart.js';
import type { ChartData } from 'chart.js/dist/types';
import { Show, createSignal } from 'solid-js';
import * as uuid from 'uuid';

export default {
  title: 'Components/Chart',
};

type DataPoint = {
  id: string;
  label: string;
  value: number;
};

type SelectedDataPointDetailsProps = {
  dataPoint: DataPoint;
};

const SelectedDataPointDetails = (props: SelectedDataPointDetailsProps) => {
  return (
    <div>
      Selected Data Point Details
      <ul>
        <li>id: {props.dataPoint.id}</li>
        <li>label: {props.dataPoint.label}</li>
        <li>value: {props.dataPoint.value}</li>
      </ul>
    </div>
  );
};

const buildData = (count: number): DataPoint[] => {
  const rawData: DataPoint[] = [];

  for (let i = 0; i < count; i++) {
    rawData.push({ id: uuid.v4(), label: `Label${i + 1}`, value: Math.floor(Math.random() * 1000) + 100 });
  }

  return rawData;
};

export const Bar = () => {
  const rawData = buildData(60);

  const chartStore = chartComponentUtils.createStore();

  const [chartOptions, setChartOptions] = createSignal<ChartOptions<'bar'>>({
    scales: chartComponentUtils.buildScalesOptions({
      xAxisLabel: 'Labels',
      yAxisLabel: 'Value',
    }),
    onClick(_event, elements) {
      const clickedIndex = elements[0]?.index;
      const updateData = chartComponentUtils.updateBarDataForSelected(
        chartData(),
        clickedIndex,
        chartStore.selectedDataIndex(),
      );

      setChartData(updateData.chartData);
      chartStore.setSelectedDataIndex(updateData.newSelectedIndex);
      chartStore.chartInstance()?.update();
    },
  });
  const [chartData, setChartData] = createSignal<ChartData<'bar'>>({
    labels: rawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultBarDatasetOptions(rawData.length),
        label: 'Value',
        data: rawData.map((row) => row.value),
      },
    ],
  });

  return (
    <>
      <SandboxExamplesContainer>
        <Chart.Bar chartStore={chartStore} data={chartData()} options={chartOptions()} />
      </SandboxExamplesContainer>
      <Show when={chartStore.selectedDataIndex() !== undefined}>
        <SelectedDataPointDetails dataPoint={rawData[chartStore.selectedDataIndex()!]} />
      </Show>
    </>
  );
};

export const Line = () => {
  const rawData = buildData(16);

  const chartStore = chartComponentUtils.createStore();

  const [chartOptions, setChartOptions] = createSignal<ChartOptions<'line'>>({
    scales: chartComponentUtils.buildScalesOptions({
      xAxisLabel: 'Labels',
      yAxisLabel: 'Value',
    }),
    onClick(_event, elements) {
      const clickedIndex = elements[0]?.index;
      const updateData = chartComponentUtils.updateLineDataForSelected(
        chartData(),
        clickedIndex,
        chartStore.selectedDataIndex(),
      );

      setChartData(updateData.chartData);
      chartStore.setSelectedDataIndex(updateData.newSelectedIndex);
      chartStore.chartInstance()?.update();
    },
  });
  const [chartData, setChartData] = createSignal<ChartData<'line'>>({
    labels: rawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultLineDatasetOptions(rawData.length),
        label: 'Value',
        data: rawData.map((row) => row.value),
      },
    ],
  });

  return (
    <>
      <SandboxExamplesContainer>
        <Chart.Line chartStore={chartStore} data={chartData()} options={chartOptions()} />
      </SandboxExamplesContainer>
      <Show when={chartStore.selectedDataIndex() !== undefined}>
        <SelectedDataPointDetails dataPoint={rawData[chartStore.selectedDataIndex()!]} />
      </Show>
    </>
  );
};

export const Radar = () => {
  const rawData = buildData(20);

  const chartStore = chartComponentUtils.createStore();

  const [chartOptions, setChartOptions] = createSignal<ChartOptions<'radar'>>({
    ...chartComponentUtils.buildDefaultRadarOptions({
      pointLabelsCallback: (_label, index) => {
        const rawDataItem = rawData[index];

        return [rawDataItem.label, rawDataItem.value.toString()];
      },
    }),
    onClick(_event, elements) {
      const clickedIndex = elements[0]?.index;
      const updateData = chartComponentUtils.updateRadarDataForSelected(
        chartData(),
        clickedIndex,
        chartStore.selectedDataIndex(),
      );

      setChartData(updateData.chartData);
      chartStore.setSelectedDataIndex(updateData.newSelectedIndex);
      chartStore.chartInstance()?.update();
    },
  });
  const [chartData, setChartData] = createSignal<ChartData<'radar'>>({
    labels: rawData.map((row) => row.label),
    datasets: [
      {
        ...chartComponentUtils.buildDefaultRadarDatasetOptions(rawData.length),
        label: 'Value',
        data: rawData.map((row) => row.value),
      },
    ],
  });

  return (
    <>
      <SandboxExamplesContainer class={styles.radarChart}>
        <Chart.Radar chartStore={chartStore} data={chartData()} options={chartOptions()} />
      </SandboxExamplesContainer>
      <Show when={chartStore.selectedDataIndex() !== undefined}>
        <SelectedDataPointDetails dataPoint={rawData[chartStore.selectedDataIndex()!]} />
      </Show>
    </>
  );
};
