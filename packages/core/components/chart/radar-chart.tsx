import type { ChartCommonProps } from '$/core/components/chart/utils/core';
import type { CommonDataAttributes } from '$/core/types/generic';
import ChartJS from 'chart.js/auto';
import type { ChartData, ChartOptions } from 'chart.js/dist/types';
import { onMount } from 'solid-js';

export type RadarChartProps = CommonDataAttributes &
  ChartCommonProps & {
    data: ChartData<'radar'>;
    options?: ChartOptions<'radar'>;
  };

const RadarChart = (props: RadarChartProps) => {
  let containerElement: HTMLCanvasElement | undefined;

  onMount(() => {
    if (!containerElement) {
      return;
    }

    props.chartStore.setChartInstance(
      new ChartJS<'radar'>(containerElement, {
        type: 'radar',
        data: props.data,
        options: props.options,
      }),
    );
  });

  return <canvas ref={containerElement}>CHART</canvas>;
};

export default RadarChart;
