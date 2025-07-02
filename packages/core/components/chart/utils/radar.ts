import type { ChartDataset, ChartOptions } from 'chart.js';
import type { ChartData } from 'chart.js/dist/types';

const defaultPointRadius = 3;
const selectedPointRadius = 8;
const defaultColor = 'rgb(54, 162, 235)';
const selectedColor = 'rgb(35,86,121)';

const buildDefaultRadarDatasetOptions = (count: number): Partial<ChartDataset<'radar'>> => {
  return {
    pointBackgroundColor: new Array(count).fill(defaultColor),
    pointBorderColor: new Array(count).fill(defaultColor),
    pointRadius: new Array(count).fill(defaultPointRadius),
    hoverRadius: new Array(count).fill(defaultPointRadius),
    pointHitRadius: 25,
  };
};

type UpdateRadarDataForSelectedReturns = {
  chartData: ChartData<'radar'>;
  newSelectedIndex: number | undefined;
};

const updateRadarDataForSelected = (
  chartData: ChartData<'radar'>,
  selectedIndex: number | undefined,
  previouslySelectedIndex: number | undefined,
): UpdateRadarDataForSelectedReturns => {
  if (
    Array.isArray(chartData.datasets[0].pointRadius) === false ||
    Array.isArray(chartData.datasets[0].hoverRadius) === false
  ) {
    return {
      chartData,
      newSelectedIndex: previouslySelectedIndex,
    };
  }

  const hasNewSelectedIndex = previouslySelectedIndex !== selectedIndex;

  if (previouslySelectedIndex !== undefined) {
    chartData.datasets[0].pointRadius[previouslySelectedIndex] = defaultPointRadius;
    chartData.datasets[0].hoverRadius[previouslySelectedIndex] = defaultPointRadius;
  }

  if (hasNewSelectedIndex && selectedIndex !== undefined) {
    chartData.datasets[0].pointRadius[selectedIndex] = selectedPointRadius;
    chartData.datasets[0].hoverRadius[selectedIndex] = selectedPointRadius;
  }

  return {
    chartData,

    // we want to return undefined so that when the user selects the already selected item, we de-select it
    newSelectedIndex: hasNewSelectedIndex ? selectedIndex : undefined,
  };
};

export type BuildDefaultRadarOptionsOptions = ChartOptions<'radar'> & {
  pointLabelsCallback?: (label: string, index: number) => string[];
};

// @todo this might be able to be cleaned up, should check that when I have some time
const buildDefaultRadarOptions = (options: BuildDefaultRadarOptionsOptions = {}): ChartOptions<'radar'> => {
  const chartOptions: ChartOptions<'radar'> = {
    maintainAspectRatio: false,
  };
  const { pointLabelsCallback, ...restOfOptions } = options;

  if (pointLabelsCallback) {
    chartOptions.scales = {
      r: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            return value;
          },
        },
        pointLabels: {
          callback: options.pointLabelsCallback,
          font: {
            size: 12,
          },
          padding: 10,
        },
      },
    };
  }

  return {
    ...chartOptions,
    ...restOfOptions,
    scales: {
      ...(restOfOptions?.scales || {}),
      r: {
        ...(restOfOptions?.scales?.r || {}),
        pointLabels: {
          callback: options.pointLabelsCallback,
          ...(restOfOptions?.scales?.r?.pointLabels || {}),
        },
      },
    },
  };
};

export { buildDefaultRadarDatasetOptions, buildDefaultRadarOptions, updateRadarDataForSelected };
