import {
  buildDefaultBarDatasetOptions,
  buildDefaultBarOptions,
  updateBarDataForSelected,
} from '$/core/components/chart/utils/bar';
import {
  buildScalesOptions,
  type ChartComponentRef,
  createCustomTicks,
  limitTickCount,
  transformDataValueForCustomTicks,
} from '$/core/components/chart/utils/core';
import {
  buildDefaultLineDatasetOptions,
  buildDefaultLineOptions,
  updateLineDataForSelected,
} from '$/core/components/chart/utils/line';
import {
  type BuildDefaultRadarOptionsOptions,
  buildDefaultRadarDatasetOptions,
  buildDefaultRadarOptions,
  updateRadarDataForSelected,
} from '$/core/components/chart/utils/radar';

export type { BuildDefaultRadarOptionsOptions, ChartComponentRef };

export const chartComponentUtils = {
  // general
  buildScalesOptions,
  createCustomTicks,
  limitTickCount,
  transformDataValueForCustomTicks,

  // bar
  buildDefaultBarDatasetOptions,
  updateBarDataForSelected,
  buildDefaultBarOptions,

  //line
  buildDefaultLineDatasetOptions,
  updateLineDataForSelected,
  buildDefaultLineOptions,

  // radar
  buildDefaultRadarDatasetOptions,
  buildDefaultRadarOptions,
  updateRadarDataForSelected,
};
