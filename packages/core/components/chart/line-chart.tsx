import { chartComponentUtils } from '$/core/components/chart/utils';
import type { ChartCommonProps } from '$/core/components/chart/utils/core';
import type { CommonDataAttributes } from '$/core/types/generic';
import type { ChartConfiguration, ChartOptions } from 'chart.js';
import ChartJS from 'chart.js/auto';
import type { ChartData } from 'chart.js/dist/types';
import { createSignal, onMount } from 'solid-js';

export type LineChartProps = CommonDataAttributes &
  ChartCommonProps & {
    data: ChartData<'line'>;
    options?: ChartOptions<'line'>;
    plugins?: ChartConfiguration<'line'>['plugins'];
  };

const defaultOption = chartComponentUtils.buildDefaultLineOptions();

const LineChart = (props: LineChartProps) => {
  const [containerElementRef, setContainerElementRef] = createSignal<HTMLCanvasElement | undefined>();

  props.chartStore.registerUpdateEffect(props);

  onMount(() => {
    const currentContainerElementRef = containerElementRef();

    if (!currentContainerElementRef) {
      return;
    }

    props.chartStore.setChartInstance(
      new ChartJS<'line'>(currentContainerElementRef, {
        type: 'line',
        data: props.data,
        options: props.options || defaultOption,
        plugins: props.plugins,
      }),
    );
  });

  return <canvas ref={setContainerElementRef} />;
};

export default LineChart;
