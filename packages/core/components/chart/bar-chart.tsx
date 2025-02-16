import { chartComponentUtils } from '$/core/components/chart/utils';
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

const defaultOptions = chartComponentUtils.buildDefaultBarOptions();

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
        options: props.options || defaultOptions,
      }),
    );
  });

  return <canvas ref={containerElement} />;
};

export default BarChart;
