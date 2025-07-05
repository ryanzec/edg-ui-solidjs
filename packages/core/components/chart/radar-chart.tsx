import { chartComponentUtils } from '$/core/components/chart/utils';
import type { ChartCommonProps } from '$/core/components/chart/utils/core';
import type { CommonDataAttributes } from '$/core/types/generic';
import type { ChartConfiguration } from 'chart.js';
import ChartJS from 'chart.js/auto';
import type { ChartData, ChartOptions } from 'chart.js/dist/types';
import { createSignal, onMount } from 'solid-js';

export type RadarChartProps = CommonDataAttributes &
  ChartCommonProps & {
    data: ChartData<'radar'>;
    options?: ChartOptions<'radar'>;
    plugins?: ChartConfiguration<'radar'>['plugins'];
  };

const defaultOptions = chartComponentUtils.buildDefaultRadarOptions();

const RadarChart = (props: RadarChartProps) => {
  const [containerElementRef, setContainerElementRef] = createSignal<HTMLCanvasElement | undefined>();

  props.chartStore.registerUpdateEffect(props);

  onMount(() => {
    const currentContainerElementRef = containerElementRef();

    if (!currentContainerElementRef) {
      return;
    }

    props.chartStore.setChartInstance(
      new ChartJS<'radar'>(currentContainerElementRef, {
        type: 'radar',
        data: props.data,
        options: props.options || defaultOptions,
        plugins: props.plugins,
      }),
    );
  });

  return <canvas ref={setContainerElementRef} />;
};

export default RadarChart;
