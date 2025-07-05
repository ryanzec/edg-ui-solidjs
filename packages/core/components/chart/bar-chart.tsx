import { chartComponentUtils } from '$/core/components/chart/utils';
import type { ChartCommonProps } from '$/core/components/chart/utils/core';
import type { CommonDataAttributes } from '$/core/types/generic';
import type { ChartOptions } from 'chart.js';
import ChartJS from 'chart.js/auto';
import type { ChartConfiguration, ChartData } from 'chart.js/dist/types';
import { createSignal, onMount } from 'solid-js';

export type BarChartProps = CommonDataAttributes &
  ChartCommonProps & {
    data: ChartData<'bar'>;
    options?: ChartOptions<'bar'>;
    plugins?: ChartConfiguration<'bar'>['plugins'];
  };

const defaultOptions = chartComponentUtils.buildDefaultBarOptions();

const BarChart = (props: BarChartProps) => {
  const [containerElementRef, setContainerElementRef] = createSignal<HTMLCanvasElement | undefined>();

  props.chartStore.registerUpdateEffect(props);

  onMount(() => {
    const currentContainerElementRef = containerElementRef();

    if (!currentContainerElementRef) {
      return;
    }

    props.chartStore.setChartInstance(
      new ChartJS<'bar'>(currentContainerElementRef, {
        type: 'bar',
        data: props.data,
        options: props.options || defaultOptions,
        plugins: props.plugins,
      }),
    );
  });

  return <canvas ref={setContainerElementRef} />;
};

export default BarChart;
