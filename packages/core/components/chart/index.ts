import { default as BarChart, type BarChartProps } from '$/core/components/chart/bar-chart';
import { default as LineChart, type LineChartProps } from '$/core/components/chart/line-chart';
import { default as RadarChart, type RadarChartProps } from '$/core/components/chart/radar-chart';

export type { BarChartProps, LineChartProps, RadarChartProps };

export type { ChartCommonProps } from '$/core/components/chart/utils/core';

export { chartComponentUtils, type BuildDefaultRadarOptionsOptions } from '$/core/components/chart/utils';

export const Chart = Object.assign({}, { Bar: BarChart, Line: LineChart, Radar: RadarChart });

export default Chart;
