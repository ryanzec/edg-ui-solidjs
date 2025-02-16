import type { ChartCommonProps } from '$/core/components/chart/utils/core';
import type { CommonDataAttributes } from '$/core/types/generic';
import type { ChartOptions } from 'chart.js';
import ChartJS from 'chart.js/auto';
import type { ChartData } from 'chart.js/dist/types';
import { onMount } from 'solid-js';

export type BarChartProps = CommonDataAttributes &
  ChartCommonProps & {
    data: ChartData<'bar'>;
    options?: ChartOptions<'bar'>;
  };

const BarChart = (props: BarChartProps) => {
  let containerElement: HTMLCanvasElement | undefined;

  onMount(() => {
    if (!containerElement) {
      return;
    }

    props.chartStore.setChartInstance(
      new ChartJS<'bar'>(containerElement, {
        type: 'bar',
        data: props.data,
        options: props.options,
      }),
    );
  });

  return <canvas ref={containerElement}>CHART</canvas>;
};

export default BarChart;
