import { defaultColor, defaultPointRadius, selectedPointRadius } from '$/core/components/chart/utils/core';
import type { ChartData, ChartDataset, ChartOptions } from 'chart.js';

const buildDefaultLineDatasetOptions = (count: number): Partial<ChartDataset<'line'>> => {
  return {
    pointBackgroundColor: new Array(count).fill(defaultColor),
    pointBorderColor: new Array(count).fill(defaultColor),
    pointRadius: new Array(count).fill(defaultPointRadius),
    pointHoverRadius: new Array(count).fill(defaultPointRadius),
    pointHitRadius: 25,
  };
};

type UpdateLineDataForSelectedReturns = {
  chartData: ChartData<'line'>;
  newSelectedIndex: number | undefined;
};

const updateLineDataForSelected = (
  chartData: ChartData<'line'>,
  selectedIndex: number | undefined,
  previouslySelectedIndex: number | undefined,
): UpdateLineDataForSelectedReturns => {
  if (
    Array.isArray(chartData.datasets[0].pointRadius) === false ||
    Array.isArray(chartData.datasets[0].pointHoverRadius) === false
  ) {
    return {
      chartData,
      newSelectedIndex: previouslySelectedIndex,
    };
  }

  const hasNewSelectedIndex = previouslySelectedIndex !== selectedIndex;

  if (previouslySelectedIndex !== undefined) {
    chartData.datasets[0].pointRadius[previouslySelectedIndex] = defaultPointRadius;
    chartData.datasets[0].pointHoverRadius[previouslySelectedIndex] = defaultPointRadius;
  }

  if (hasNewSelectedIndex && selectedIndex !== undefined) {
    chartData.datasets[0].pointRadius[selectedIndex] = selectedPointRadius;
    chartData.datasets[0].pointHoverRadius[selectedIndex] = selectedPointRadius;
  }

  return {
    chartData,

    // we want to return undefined so that when the user selects the already selected item, we de-select it
    newSelectedIndex: hasNewSelectedIndex ? selectedIndex : undefined,
  };
};

const buildDefaultLineOptions = (): ChartOptions<'line'> => {
  return {
    maintainAspectRatio: false,
  };
};

export { buildDefaultLineDatasetOptions, updateLineDataForSelected, buildDefaultLineOptions };
