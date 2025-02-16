import type { Chart } from 'chart.js';
import { createSignal } from 'solid-js';

const defaultPointRadius = 3;
const selectedPointRadius = 8;
const defaultColor = 'rgb(54, 162, 235)';
const selectedColor = 'rgb(35,86,121)';

export type ChartCommonProps = {
  chartStore: ChartStore;
};

export type ChartStore = {
  chartInstance: () => Chart | undefined;
  setChartInstance: (chartInstance: Chart) => void;
  selectedDataIndex: () => number | undefined;
  setSelectedDataIndex: (index: number | undefined) => void;
};

const createStore = (): ChartStore => {
  const [chartInstance, setChartInstance] = createSignal<Chart>();
  const [selectedDataIndex, setSelectedDataIndex] = createSignal<number>();

  return {
    chartInstance,
    setChartInstance,
    selectedDataIndex,
    setSelectedDataIndex,
  };
};

type BuildScalesOptionsReturn = {
  x?: {
    title: {
      display: boolean;
      text: string;
    };
  };
  y?: {
    title: {
      display: boolean;
      text: string;
    };
  };
};

type BuildScalesOptionsOptions = {
  xAxisLabel?: string;
  yAxisLabel?: string;
};

const buildScalesOptions = (passedOptions: BuildScalesOptionsOptions): BuildScalesOptionsReturn => {
  const scalesOptions: BuildScalesOptionsReturn = {};

  if (passedOptions.xAxisLabel) {
    scalesOptions.x = {
      title: {
        display: true,
        text: passedOptions.xAxisLabel,
      },
    };
  }

  if (passedOptions.yAxisLabel) {
    scalesOptions.y = {
      title: {
        display: true,
        text: passedOptions.yAxisLabel,
      },
    };
  }

  return scalesOptions;
};

export { defaultColor, selectedColor, defaultPointRadius, selectedPointRadius, createStore, buildScalesOptions };
