import type { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import ChartJS from 'chart.js/auto';
import type { ChartData } from 'chart.js/dist/types';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { chartComponentUtils } from '$/core/components/chart/utils';
import type { ChartCommonProps, ChartComponentRef } from '$/core/components/chart/utils/core';
import type { CommonDataAttributes } from '$/core/types/generic';

export type LineChartProps = CommonDataAttributes &
  ChartCommonProps & {
    data: ChartData<'line'>;
    options?: ChartOptions<'line'>;
    plugins?: ChartConfiguration<'line'>['plugins'];
  };

const defaultOption = chartComponentUtils.buildDefaultLineOptions();

const LineChart = (props: LineChartProps) => {
  const [containerElementRef, setContainerElementRef] = createSignal<HTMLCanvasElement | undefined>();
  const [chartInstance, setChartInstance] = createSignal<Chart>();
  const [selectedDataIndex, setSelectedDataIndex] = createSignal<number>();

  createEffect(function updateChartData() {
    const currentChartInstance = chartInstance();

    if (!currentChartInstance) {
      return;
    }

    // @ts-ignore not sure why this errors, but it is correct
    currentChartInstance.data.labels = props.data.labels;
    // @ts-ignore not sure why this errors, but it is correct
    currentChartInstance.data.datasets = props.data.datasets;

    if (props.options) {
      // @ts-ignore not sure why this errors, but it is correct
      currentChartInstance.options = props.options;
    }

    currentChartInstance.update();
  });

  onMount(() => {
    const currentContainerElementRef = containerElementRef();

    if (!currentContainerElementRef) {
      return;
    }

    setChartInstance(
      new ChartJS<'line'>(currentContainerElementRef, {
        type: 'line',
        data: props.data,
        options: props.options || defaultOption,
        plugins: props.plugins,
      }),
    );
  });

  const chartComponentRef: ChartComponentRef = {
    chartInstance,
    setChartInstance,
    selectedDataIndex,
    setSelectedDataIndex,
  };

  props.chartComponentRef?.onReady(chartComponentRef);

  onCleanup(() => {
    chartInstance()?.destroy();
    props.chartComponentRef?.onCleanup();
  });

  return <canvas ref={setContainerElementRef} />;
};

export default LineChart;
