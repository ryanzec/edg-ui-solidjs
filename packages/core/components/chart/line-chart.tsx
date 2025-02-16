import type { ChartCommonProps } from '$/core/components/chart/utils/core';
import type { CommonDataAttributes } from '$/core/types/generic';
import type { ChartOptions } from 'chart.js';
import ChartJS from 'chart.js/auto';
import type { ChartData } from 'chart.js/dist/types';
import { onMount } from 'solid-js';

export type LineChartProps = CommonDataAttributes &
  ChartCommonProps & {
    data: ChartData<'line'>;
    options?: ChartOptions<'line'>;
  };

const LineChart = (props: LineChartProps) => {
  let containerElement: HTMLCanvasElement | undefined;

  onMount(() => {
    if (!containerElement) {
      return;
    }

    props.chartStore.setChartInstance(
      new ChartJS<'line'>(containerElement, {
        type: 'line',
        data: props.data,
        options: props.options,
      }),
    );
  });

  return <canvas ref={containerElement}>CHART</canvas>;
};

export default LineChart;
