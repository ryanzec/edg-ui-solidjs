import { chartComponentUtils } from '$/core/components/chart/utils';
import type { ChartCommonProps } from '$/core/components/chart/utils/core';
import type { CommonDataAttributes } from '$/core/types/generic';
import type { ChartConfiguration } from 'chart.js';
import ChartJS from 'chart.js/auto';
import type { ChartData, ChartOptions } from 'chart.js/dist/types';
import { onMount } from 'solid-js';

export type RadarChartProps = CommonDataAttributes &
  ChartCommonProps & {
    data: ChartData<'radar'>;
    options?: ChartOptions<'radar'>;
    plugins?: ChartConfiguration<'radar'>['plugins'];
  };

const defaultOptions = chartComponentUtils.buildDefaultRadarOptions();

const RadarChart = (props: RadarChartProps) => {
  let containerElement: HTMLCanvasElement | undefined;

  props.chartStore.registerUpdateEffect(props);

  onMount(() => {
    if (!containerElement) {
      return;
    }

    props.chartStore.setChartInstance(
      new ChartJS<'radar'>(containerElement, {
        type: 'radar',
        data: props.data,
        options: props.options || defaultOptions,
        plugins: props.plugins,
      }),
    );
  });

  return <canvas ref={containerElement} />;
};

export default RadarChart;
