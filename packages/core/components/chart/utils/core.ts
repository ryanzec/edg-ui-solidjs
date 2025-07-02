import { loggerUtils } from '$/core/utils/logger';
import type { Chart, ChartData, ChartOptions, ChartTypeRegistry } from 'chart.js';
import { createEffect, createSignal, onCleanup } from 'solid-js';

const defaultPointRadius = 3;
const selectedPointRadius = 8;
const defaultColor = 'rgb(54, 162, 235)';
const selectedColor = 'rgb(35,86,121)';

export type ChartCommonProps = {
  chartStore: ChartStore;
};

type RegisterUpdateEffectProps<TChartType extends keyof ChartTypeRegistry> = {
  data: ChartData<TChartType>;
  options?: ChartOptions<TChartType>;
};

export type ChartStore = {
  chartInstance: () => Chart | undefined;
  setChartInstance: (chartInstance: Chart) => void;
  selectedDataIndex: () => number | undefined;
  setSelectedDataIndex: (index: number | undefined) => void;
  registerUpdateEffect: <TChartType extends keyof ChartTypeRegistry>(
    props: RegisterUpdateEffectProps<TChartType>,
  ) => void;
};

const createStore = (): ChartStore => {
  const [chartInstance, setChartInstance] = createSignal<Chart>();
  const [selectedDataIndex, setSelectedDataIndex] = createSignal<number>();

  const registerUpdateEffect = <TChartType extends keyof ChartTypeRegistry>(
    props: RegisterUpdateEffectProps<TChartType>,
  ) => {
    createEffect(function updateChartData() {
      const currentChartInstance = chartInstance();

      if (!currentChartInstance) {
        return;
      }

      // @ts-ignore not sure why this errors, but it is correct
      currentChartInstance.data.labels = props.data.labels;
      // @ts-ignore not sure why this errors, but it is correct
      currentChartInstance.data.datasets = props.data.datasets;

      if (props.options) {
        // @ts-ignore not sure why this errors, but it is correct
        currentChartInstance.options = props.options;
      }

      currentChartInstance.update();
    });
  };

  onCleanup(() => {
    chartInstance()?.destroy();
  });

  return {
    chartInstance,
    setChartInstance,
    selectedDataIndex,
    setSelectedDataIndex,
    registerUpdateEffect,
  };
};

type BuildScalesOptionsReturn = {
  x?: {
    title: {
      display: boolean;
      text: string;
    };
    stacked?: boolean;
  };
  y?: {
    title: {
      display: boolean;
      text: string;
    };
    stacked?: boolean;
  };
};

type BuildScalesOptionsOptions = {
  xAxisLabel?: string;
  yAxisLabel?: string;
  xStacked?: boolean;
  yStacked?: boolean;
};

const buildScalesOptions = (passedOptions: BuildScalesOptionsOptions): BuildScalesOptionsReturn => {
  const scalesOptions: BuildScalesOptionsReturn = {};

  if (passedOptions.xAxisLabel) {
    scalesOptions.x = {
      title: {
        display: true,
        text: passedOptions.xAxisLabel,
      },
      stacked: passedOptions.xStacked || false,
    };
  }

  if (passedOptions.yAxisLabel) {
    scalesOptions.y = {
      title: {
        display: true,
        text: passedOptions.yAxisLabel,
      },
      stacked: passedOptions.yStacked || false,
    };
  }

  return scalesOptions;
};

const createCustomTicks = (values: number[]): number[] => {
  const ticks: number[] = [];
  const minimumValue = Math.min(...values);
  const maximumValue = Math.max(...values);

  if (maximumValue - minimumValue > 2000) {
    // create logarithmic-like steps
    let magnitude = Math.floor(Math.log10(minimumValue));
    const maximumMagnitude = Math.ceil(Math.log10(maximumValue));

    while (magnitude <= maximumMagnitude) {
      const base = 10 ** magnitude;

      ticks.push(base);

      if (magnitude < maximumMagnitude) {
        ticks.push(2.5 * base);
        ticks.push(5 * base);
      }

      magnitude++;
    }
  } else {
    return [];
  }

  return ticks;
};

const limitTickCount = (generatedTicks: number[], maxAllowedTicks: number): number[] => {
  if (generatedTicks.length === 0 || maxAllowedTicks <= 0) {
    return [];
  }

  const sortedTicks = [...new Set(generatedTicks.sort((a, b) => a - b))];
  const minimumGeneratedTick = sortedTicks[0];
  const maximumGeneratedTick = sortedTicks[sortedTicks.length - 1];

  if (minimumGeneratedTick === maximumGeneratedTick || maxAllowedTicks === 1) {
    return [maximumGeneratedTick];
  }

  if (sortedTicks.length <= maxAllowedTicks) {
    return sortedTicks;
  }

  const result: number[] = [minimumGeneratedTick];

  // we minus two as we always keep the first and last ticks
  const numberOfTickToPick = maxAllowedTicks - 2;
  const availableTicksToChose = sortedTicks.filter(
    (tick) => tick > minimumGeneratedTick && tick < maximumGeneratedTick,
  );

  if (numberOfTickToPick > 0 && availableTicksToChose.length > 0) {
    if (availableTicksToChose.length <= numberOfTickToPick) {
      result.push(...availableTicksToChose);
    } else {
      const step = availableTicksToChose.length / numberOfTickToPick;

      for (let i = 0; i < numberOfTickToPick; i++) {
        const pickIndex = Math.min(availableTicksToChose.length - 1, Math.floor(i * step));

        result.push(availableTicksToChose[pickIndex]);
      }
    }
  }

  result.push(maximumGeneratedTick);

  return [...new Set(result)].sort((a, b) => a - b);
};

const transformDataValueForCustomTicks = (originalValue: number, customTicksArray: number[]) => {
  if (customTicksArray.length === 0) {
    return originalValue;
  }

  const sortedTicks = [...new Set(customTicksArray.sort((a, b) => a - b))];

  if (originalValue <= sortedTicks[0]) {
    return 0;
  }

  const lastTickIndex = sortedTicks.length - 1;

  if (originalValue >= sortedTicks[lastTickIndex]) {
    return lastTickIndex;
  }

  for (let i = 0; i < lastTickIndex; i++) {
    const lowerBound = sortedTicks[i];
    const upperBound = sortedTicks[i + 1];

    if (originalValue >= lowerBound && originalValue < upperBound) {
      if (upperBound === lowerBound) {
        continue;
      }

      const fraction = (originalValue - lowerBound) / (upperBound - lowerBound);

      return i + fraction;
    }
  }

  loggerUtils.warn(`transformDataValue: value couldn't be mapped, returning original of ${originalValue}.`);

  return originalValue;
};

export {
  defaultColor,
  selectedColor,
  defaultPointRadius,
  selectedPointRadius,
  createStore,
  buildScalesOptions,
  createCustomTicks,
  limitTickCount,
  transformDataValueForCustomTicks,
};
