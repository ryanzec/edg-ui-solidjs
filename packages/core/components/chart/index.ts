import Bar, { type BarChartProps } from '$/core/components/chart/bar-chart';
import Line, { type LineChartProps } from '$/core/components/chart/line-chart';
import Radar, { type RadarChartProps } from '$/core/components/chart/radar-chart';

export type { BarChartProps, LineChartProps, RadarChartProps };

export type { ChartCommonProps } from '$/core/components/chart/utils/core';

export { chartComponentUtils } from '$/core/components/chart/utils';

export default Object.assign({}, { Bar, Line, Radar });
