import { buildDefaultBarDatasetOptions, updateBarDataForSelected } from '$/core/components/chart/utils/bar';
import { buildScalesOptions, createStore } from '$/core/components/chart/utils/core';
import { buildDefaultLineDatasetOptions, updateLineDataForSelected } from '$/core/components/chart/utils/line';
import {
  buildDefaultRadarDatasetOptions,
  buildDefaultRadarOptions,
  updateRadarDataForSelected,
} from '$/core/components/chart/utils/radar';

export const chartComponentUtils = {
  // general
  createStore,
  buildScalesOptions,

  // bar
  buildDefaultBarDatasetOptions,
  updateBarDataForSelected,

  //line
  buildDefaultLineDatasetOptions,
  updateLineDataForSelected,

  // radar
  buildDefaultRadarDatasetOptions,
  buildDefaultRadarOptions,
  updateRadarDataForSelected,
};
