import * as fs from 'node:fs';
import { cachedDataVersionTag } from 'node:v8';

const FIGMA_VARIABLES_JSON_PATH = './artifacts/figma-variables.json';
const BASE_SIZE = 16;

const TemplatePath = {
  CSS: './scripts/templates/variables.css.template',
} as const;

type TemplatePath = (typeof TemplatePath)[keyof typeof TemplatePath];

const OutputPath = {
  CSS: './packages/core/styles/variables.css',
} as const;

type OutputPath = (typeof OutputPath)[keyof typeof OutputPath];

const ReplaceKey = {
  LIGHT_CSS_VARIABLES: '%LIGHT_COLOR_VARIABLES%',
  DARK_CSS_VARIABLES: '%DARK_COLOR_VARIABLES%',
  SPACING_CSS_VARIABLES: '%SPACING_VARIABLES%',
  BORDER_RADIUS_CSS_VARIABLES: '%BORDER_RADIUS_VARIABLES%',
  FONT_SIZE_CSS_VARIABLES: '%FONT_SIZE_VARIABLES%',
  LINE_HEIGHT_CSS_VARIABLES: '%LINE_HEIGHT_VARIABLES%',
  LETTER_SPACING_CSS_VARIABLES: '%LETTER_SPACING_VARIABLES%',
  Z_INDEX_CSS_VARIABLES: '%Z_INDEX_VARIABLES%',
  OPACITY_CSS_VARIABLES: '%OPACITY_VARIABLES%',
  TW_LIGHT_CSS_VARIABLES: '%TW_LIGHT_COLOR_VARIABLES%',
  TW_DARK_CSS_VARIABLES: '%TW_DARK_COLOR_VARIABLES%',
  TW_SPACING_CSS_VARIABLES: '%TW_SPACING_VARIABLES%',
  TW_BORDER_RADIUS_CSS_VARIABLES: '%TW_BORDER_RADIUS_VARIABLES%',
  TW_LINE_HEIGHT_CSS_VARIABLES: '%TW_LINE_HEIGHT_VARIABLES%',
  TW_LETTER_SPACING_CSS_VARIABLES: '%TW_LETTER_SPACING_VARIABLES%',
  TW_Z_INDEX_CSS_VARIABLES: '%TW_Z_INDEX_VARIABLES%',
  TW_OPACITY_CSS_VARIABLES: '%TW_OPACITY_VARIABLES%',
  TW_FONT_SIZE_CSS_VARIABLES: '%TW_FONT_SIZE_VARIABLES%',
} as const;

type ReplaceKey = (typeof ReplaceKey)[keyof typeof ReplaceKey];

const VariableCollection = {
  COLOR: 'color',
  SPACING: 'spacing',
  BORDER_RADIUS: 'border-radius',
  FONT_SIZE: 'font-size',
  LINE_HEIGHT: 'line-height',
  LETTER_SPACING: 'letter-spacing',
  Z_INDEX: 'z-index',
  OPACITY: 'opacity',
} as const;

type VariableCollection = (typeof VariableCollection)[keyof typeof VariableCollection];

type AliasVariable = {
  collection: string;
  name: string;
};

type TypographyVariable = {
  // this need to be in pixel in figma
  fontSize: number;

  fontFamily: string;
  fontWeight: string;

  // this need to be in pixel in figma
  lineHeight: number;

  // this needs to be in pixel in figma
  letterSpacing: number;
};

type Variable = {
  name: string;
  type: string;
  isAlias: boolean;
  value: string | number | AliasVariable | TypographyVariable;
};

type Mode = {
  name: string;
  variables: Variable[];
};

type Collection = {
  name: string;
  modes: Mode[];
};

type ConfigData = { collections: Collection[] };

const remSizeCollections: VariableCollection[] = [
  VariableCollection.SPACING,
  VariableCollection.BORDER_RADIUS,
  VariableCollection.FONT_SIZE,
  VariableCollection.LINE_HEIGHT,
  VariableCollection.BORDER_RADIUS,
];

const variableCollectionCssVariablePrefixMap: Record<VariableCollection, string | string[]> = {
  [VariableCollection.COLOR]: 'color',
  [VariableCollection.SPACING]: 'spacing',
  [VariableCollection.BORDER_RADIUS]: 'radius',
  [VariableCollection.FONT_SIZE]: 'text',
  [VariableCollection.LINE_HEIGHT]: 'leading',
  [VariableCollection.LETTER_SPACING]: 'tracking',
  [VariableCollection.Z_INDEX]: 'z-index',
  [VariableCollection.OPACITY]: 'opacity',
};

const cleanVariableName = (variableName: string): string => variableName.replace(/\//g, '-');

const cleanColorVariableName = (variableName: string): string => {
  let cleanName = variableName.replace(/\//g, '-').replace('-base', '').replace('-color', '').replace('misc-', '');

  if (cleanName.endsWith('-on')) {
    const splitValues = cleanName.split('-');

    cleanName = [splitValues[splitValues.length - 1], ...splitValues.slice(0, splitValues.length - 1)].join('-');
  }

  return cleanName;
};

const addValuesForCssVariables = (cssPrefix: string | string[], variable: string, value: string): string[] => {
  if (typeof cssPrefix === 'string') {
    return [`  --${cssPrefix}-${variable}: ${value};`];
  }

  return cssPrefix.reduce<string[]>((collection, prefix) => {
    collection.push(`  --${prefix}-${variable}: ${value};`);

    return collection;
  }, []);
};

const buildColorCssVariables = (data: ConfigData, forTailwind = false): [string[], string[]] => {
  const colorCollection = data.collections.find((collection) => collection.name === VariableCollection.COLOR);

  if (!colorCollection) {
    throw new Error('colors collection not found');
  }

  const cssPrefix = variableCollectionCssVariablePrefixMap[VariableCollection.COLOR] as string;

  // this default value basically reset the classes for any variable type we dynamically generate to avoid the
  // default ones from being used and limit ourselves to just the ones we define
  let lightCssVariables: string[] = [];
  let darkCssVariables: string[] = [];

  for (const mode of colorCollection.modes) {
    for (const variable of mode.variables) {
      const cssVariableName = cleanColorVariableName(variable.name);
      let cssVariableValue = forTailwind ? `var(--${cssPrefix}-${cssVariableName})` : variable.value;

      if ((cssVariableValue as AliasVariable).name) {
        const aliasVariable = cssVariableValue as AliasVariable;
        const cleanedVariableName = cleanColorVariableName(aliasVariable.name);

        cssVariableValue = `--${cssPrefix}-${cleanedVariableName.replace('/', '-')}`;
      }

      const cssVariable = `  --${cssPrefix}-${cssVariableName}: ${cssVariableValue};`;

      (mode.name === 'light' ? lightCssVariables : darkCssVariables).push(cssVariable);
    }
  }

  const handleVariableReferences = (cssVariables: string[]): string[] => {
    const newCssVariables: string[] = structuredClone(cssVariables);
    const variableMap = newCssVariables.map((variable) => variable.split(': '));

    for (let i = 0; i < variableMap.length; i++) {
      // console.log(variableMap[i]);
      if (variableMap[i][1].includes('--')) {
        const replaceValue = variableMap.find((variable) => {
          // console.log(`${variable[0]};`, `  ${variableMap[i][1]}`);
          return `${variable[0]};` === `  ${variableMap[i][1]}`;
        });

        if (!replaceValue) {
          console.error(`replacement value not found for ${variableMap[i][1]}`);
          console.log(JSON.stringify(variableMap, null, 2));

          continue;
        }

        variableMap[i][1] = replaceValue[1];
      }
    }

    return variableMap.map((variable) => variable.join(': '));
  };

  if (forTailwind === false) {
    lightCssVariables = handleVariableReferences(lightCssVariables);
    darkCssVariables = handleVariableReferences(darkCssVariables);
  }

  // console.log('lightCssVariables', lightCssVariables);
  // console.log('darkCssVariables', darkCssVariables);

  return [lightCssVariables, darkCssVariables];
};

const buildGeneralCssVariables = (data: ConfigData, variableCollection: VariableCollection): string[] => {
  const collection = data.collections.find((collection) => collection.name === variableCollection);

  if (!collection) {
    throw new Error(`${collection} collection not found`);
  }

  if (collection.modes.length !== 1) {
    throw new Error(`${collection} collection should only have one mode`);
  }

  const cssPrefix = variableCollectionCssVariablePrefixMap[variableCollection];

  // this default value basically reset the classes for any variable type we dynamically generate to avoid the
  // default ones from being used and limit ourselves to just the ones we define
  let cssVariables: string[] = [];

  for (const variable of collection.modes[0].variables) {
    const variableName = cleanVariableName(variable.name);
    const variableUnit = remSizeCollections.includes(variableCollection) ? 'rem' : '';
    let variableRawValue = remSizeCollections.includes(variableCollection)
      ? (variable.value as number) / BASE_SIZE
      : (variable.value as number);

    if (variableCollection === VariableCollection.OPACITY) {
      variableRawValue /= 100;
    }

    cssVariables = cssVariables.concat(
      addValuesForCssVariables(cssPrefix, variableName, `${variableRawValue}${variableUnit}`),
    );
  }

  return cssVariables;
};

const writeCssFile = () => {
  const rawData = fs.readFileSync(FIGMA_VARIABLES_JSON_PATH, 'utf8');
  const data = JSON.parse(rawData);
  const [lightCssVariables, darkCssVariables] = buildColorCssVariables(data);
  const spacingCssVariables = buildGeneralCssVariables(data, VariableCollection.SPACING);
  const borderRadiusCssVariables = buildGeneralCssVariables(data, VariableCollection.BORDER_RADIUS);
  const fontSizeCssVariables = buildGeneralCssVariables(data, VariableCollection.FONT_SIZE);
  const lineHeightCssVariables = buildGeneralCssVariables(data, VariableCollection.LINE_HEIGHT);
  const letterSpacingCssVariables = buildGeneralCssVariables(data, VariableCollection.LETTER_SPACING);
  const zIndexCssVariables = buildGeneralCssVariables(data, VariableCollection.Z_INDEX);
  const opacityCssVariables = buildGeneralCssVariables(data, VariableCollection.OPACITY);
  const [twLightCssVariables, twDarkCssVariables] = buildColorCssVariables(data, true);
  const twSpacingCssVariables = buildGeneralCssVariables(data, VariableCollection.SPACING);
  const twBorderRadiusCssVariables = buildGeneralCssVariables(data, VariableCollection.BORDER_RADIUS);
  const twFontSizeCssVariables = buildGeneralCssVariables(data, VariableCollection.FONT_SIZE);
  const twLineHeightCssVariables = buildGeneralCssVariables(data, VariableCollection.LINE_HEIGHT);
  const twLetterSpacingCssVariables = buildGeneralCssVariables(data, VariableCollection.LETTER_SPACING);
  const twZIndexCssVariables = buildGeneralCssVariables(data, VariableCollection.Z_INDEX);
  const twOpacityCssVariables = buildGeneralCssVariables(data, VariableCollection.OPACITY);

  let cssTemplate = fs.readFileSync(TemplatePath.CSS, 'utf8');

  cssTemplate = cssTemplate
    .replaceAll(ReplaceKey.LIGHT_CSS_VARIABLES, lightCssVariables.join('\n'))
    .replaceAll(ReplaceKey.DARK_CSS_VARIABLES, darkCssVariables.join('\n'))
    .replaceAll(ReplaceKey.SPACING_CSS_VARIABLES, spacingCssVariables.join('\n'))
    .replaceAll(ReplaceKey.BORDER_RADIUS_CSS_VARIABLES, borderRadiusCssVariables.join('\n'))
    .replaceAll(ReplaceKey.LINE_HEIGHT_CSS_VARIABLES, lineHeightCssVariables.join('\n'))
    .replaceAll(ReplaceKey.Z_INDEX_CSS_VARIABLES, zIndexCssVariables.join('\n'))
    .replaceAll(ReplaceKey.OPACITY_CSS_VARIABLES, opacityCssVariables.join('\n'))
    .replaceAll(ReplaceKey.LETTER_SPACING_CSS_VARIABLES, letterSpacingCssVariables.join('\n'))
    .replaceAll(ReplaceKey.FONT_SIZE_CSS_VARIABLES, fontSizeCssVariables.join('\n'))
    .replaceAll(ReplaceKey.TW_LIGHT_CSS_VARIABLES, twLightCssVariables.join('\n'))
    .replaceAll(ReplaceKey.TW_DARK_CSS_VARIABLES, twDarkCssVariables.join('\n'))
    .replaceAll(ReplaceKey.TW_SPACING_CSS_VARIABLES, twSpacingCssVariables.join('\n'))
    .replaceAll(ReplaceKey.TW_BORDER_RADIUS_CSS_VARIABLES, twBorderRadiusCssVariables.join('\n'))
    .replaceAll(ReplaceKey.TW_LINE_HEIGHT_CSS_VARIABLES, twLineHeightCssVariables.join('\n'))
    .replaceAll(ReplaceKey.TW_Z_INDEX_CSS_VARIABLES, twZIndexCssVariables.join('\n'))
    .replaceAll(ReplaceKey.TW_OPACITY_CSS_VARIABLES, twOpacityCssVariables.join('\n'))
    .replaceAll(ReplaceKey.TW_LETTER_SPACING_CSS_VARIABLES, twLetterSpacingCssVariables.join('\n'))
    .replaceAll(ReplaceKey.TW_FONT_SIZE_CSS_VARIABLES, twFontSizeCssVariables.join('\n'));

  fs.writeFileSync(OutputPath.CSS, cssTemplate);
};

try {
  writeCssFile();

  console.log('design variables processed successfully!');
} catch (error) {
  console.error('error:', error);
  process.exit(1);
}
