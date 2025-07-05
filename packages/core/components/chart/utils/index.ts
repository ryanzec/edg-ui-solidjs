import {
  buildDefaultBarDatasetOptions,
  buildDefaultBarOptions,
  updateBarDataForSelected,
} from '$/core/components/chart/utils/bar';
import {
  buildScalesOptions,
  createChartStore,
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

export type { BuildDefaultRadarOptionsOptions };

export const chartComponentUtils = {
  // general
  createStore: createChartStore,
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
