import { defaultColor, selectedColor } from '$/core/components/chart/utils/core';
import type { ChartData, ChartDataset, ChartOptions } from 'chart.js';

const buildDefaultBarDatasetOptions = (count: number): Partial<ChartDataset<'bar'>> => {
  return {
    backgroundColor: new Array(count).fill(defaultColor),
  };
};

type UpdateBarDataForSelectedReturns = {
  chartData: ChartData<'bar'>;
  newSelectedIndex: number | undefined;
};

const updateBarDataForSelected = (
  chartData: ChartData<'bar'>,
  selectedIndex: number | undefined,
  previouslySelectedIndex: number | undefined,
): UpdateBarDataForSelectedReturns => {
  if (Array.isArray(chartData.datasets[0].backgroundColor) === false) {
    return {
      chartData,
      newSelectedIndex: previouslySelectedIndex,
    };
  }

  const hasNewSelectedIndex = previouslySelectedIndex !== selectedIndex;

  if (previouslySelectedIndex !== undefined) {
    chartData.datasets[0].backgroundColor[previouslySelectedIndex] = defaultColor;
  }

  if (hasNewSelectedIndex && selectedIndex !== undefined) {
    chartData.datasets[0].backgroundColor[selectedIndex] = selectedColor;
  }

  return {
    chartData,

    // we want to return undefined so that when the user selects the already selected item, we de-select it
    newSelectedIndex: hasNewSelectedIndex ? selectedIndex : undefined,
  };
};

const buildDefaultBarOptions = (): ChartOptions<'bar'> => {
  return {
    maintainAspectRatio: false,
  };
};

export { buildDefaultBarDatasetOptions, updateBarDataForSelected, buildDefaultBarOptions };
