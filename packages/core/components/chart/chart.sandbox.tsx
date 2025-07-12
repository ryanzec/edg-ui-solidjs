import Button from '$/core/components/button';
import Chart, { chartComponentUtils } from '$/core/components/chart';
import type { ChartComponentRef } from '$/core/components/chart';
import styles from '$/core/components/chart/chart.sandbox.module.css';
import { componentRefUtils } from '$/core/stores/component-ref';
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
  const rawData = buildData(30);
  const rawData2 = buildData(60);
  const chartComponentRef = componentRefUtils.createRef<ChartComponentRef>();

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
        chartComponentRef.api()?.selectedDataIndex(),
      );

      setChartData(updateData.chartData);
      chartComponentRef.api()?.setSelectedDataIndex(updateData.newSelectedIndex);
      chartComponentRef.api()?.chartInstance()?.update();
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

  const handleLoadSecondaryData = () => {
    setChartData({
      labels: rawData2.map((row) => row.label),
      datasets: [
        {
          ...chartComponentUtils.buildDefaultBarDatasetOptions(rawData2.length),
          label: 'Value',
          data: rawData2.map((row) => row.value),
        },
      ],
    });
  };

  return (
    <>
      <Button onClick={handleLoadSecondaryData}>Load Secondary Data</Button>
      <SandboxExamplesContainer>
        <Chart.Bar chartComponentRef={chartComponentRef} data={chartData()} options={chartOptions()} />
      </SandboxExamplesContainer>
      <Show when={chartComponentRef.api()?.selectedDataIndex() !== undefined}>
        {/* since the check returns true (since we need 0 to also render this), just ignoring the error */}
        {/* @ts-expect-error */}
        <SelectedDataPointDetails dataPoint={rawData[chartComponentRef.api()?.selectedDataIndex()]} />
      </Show>
    </>
  );
};

export const Line = () => {
  const rawData = buildData(16);
  const rawData2 = buildData(32);
  const chartComponentRef = componentRefUtils.createRef<ChartComponentRef>();

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
        chartComponentRef.api()?.selectedDataIndex(),
      );

      setChartData(updateData.chartData);
      chartComponentRef.api()?.setSelectedDataIndex(updateData.newSelectedIndex);
      chartComponentRef.api()?.chartInstance()?.update();
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

  const handleLoadSecondaryData = () => {
    setChartData({
      labels: rawData2.map((row) => row.label),
      datasets: [
        {
          ...chartComponentUtils.buildDefaultLineDatasetOptions(rawData2.length),
          label: 'Value',
          data: rawData2.map((row) => row.value),
        },
      ],
    });
  };

  return (
    <>
      <Button onClick={handleLoadSecondaryData}>Load Secondary Data</Button>
      <SandboxExamplesContainer>
        <Chart.Line chartComponentRef={chartComponentRef} data={chartData()} options={chartOptions()} />
      </SandboxExamplesContainer>
      <Show when={chartComponentRef.api()?.selectedDataIndex() !== undefined}>
        {/* since the check returns true (since we need 0 to also render this), just ignoring the error */}
        {/* @ts-expect-error */}
        <SelectedDataPointDetails dataPoint={rawData[chartComponentRef.api().selectedDataIndex()]} />
      </Show>
    </>
  );
};

export const Radar = () => {
  const rawData = buildData(20);
  const rawData2 = buildData(30);
  const chartComponentRef = componentRefUtils.createRef<ChartComponentRef>();

  const [currentRawData, setCurrentRawData] = createSignal(rawData);
  const [chartOptions, setChartOptions] = createSignal<ChartOptions<'radar'>>({
    ...chartComponentUtils.buildDefaultRadarOptions({
      pointLabelsCallback: (_label, index) => {
        const rawDataItem = currentRawData()[index];

        return [rawDataItem.label, rawDataItem.value.toString()];
      },
    }),
    onClick(_event, elements) {
      const clickedIndex = elements[0]?.index;
      const updateData = chartComponentUtils.updateRadarDataForSelected(
        chartData(),
        clickedIndex,
        chartComponentRef.api()?.selectedDataIndex(),
      );

      setChartData(updateData.chartData);
      chartComponentRef.api()?.setSelectedDataIndex(updateData.newSelectedIndex);
      chartComponentRef.api()?.chartInstance()?.update();
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

  const handleLoadSecondaryData = () => {
    setCurrentRawData(rawData2);
    setChartData({
      labels: rawData2.map((row) => row.label),
      datasets: [
        {
          ...chartComponentUtils.buildDefaultRadarDatasetOptions(rawData2.length),
          label: 'Value',
          data: rawData2.map((row) => row.value),
        },
      ],
    });
  };

  return (
    <>
      <Button onClick={handleLoadSecondaryData}>Load Secondary Data</Button>
      <SandboxExamplesContainer class={styles.radarChart}>
        <Chart.Radar chartComponentRef={chartComponentRef} data={chartData()} options={chartOptions()} />
      </SandboxExamplesContainer>
      <Show when={chartComponentRef.api()?.selectedDataIndex() !== undefined}>
        {/* since the check returns true (since we need 0 to also render this), just ignoring the error */}
        {/* @ts-expect-error */}
        <SelectedDataPointDetails dataPoint={rawData[chartComponentRef.api().selectedDataIndex()]} />
      </Show>
    </>
  );
};
