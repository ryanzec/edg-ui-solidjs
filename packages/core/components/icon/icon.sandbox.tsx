import { createEffect, createSignal, For } from 'solid-js';
import Checkbox from '$/core/components/checkbox';
import Combobox, { type ComboboxOption, comboboxComponentUtils } from '$/core/components/combobox';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import Icon, { IconColor, IconSize } from '$/core/components/icon';
import styles from '$/core/components/icon/icon.sandbox.module.css';
import { type IconName, IconVariant, supportedIconNames } from '$/core/components/icon/utils';
import Input from '$/core/components/input';
import Label from '$/core/components/label';
import Link from '$/core/components/link';
import Tooltip, { type TooltipComponentRef, TooltipTriggerEvent } from '$/core/components/tooltip';
import { componentRefUtils } from '$/core/stores/component-ref';
import { clipboardUtils } from '$/core/utils/clipboard';
import { tailwindUtils } from '$/core/utils/tailwind';

export default {
  title: 'Components/Icon',
};

export const Group = () => {
  return (
    <Icon.Group>
      <Icon icon="house" />
      <Icon icon="plug" />
      <Icon icon="moon" />
    </Icon.Group>
  );
};

export const AllIcons = () => {
  const colorOptions: ComboboxOption<ColorMetaData>[] = [
    {
      label: 'Inherit (Default)',
      value: IconColor.INHERIT,
      meta: { iconColor: IconColor.INHERIT },
    },
    {
      label: 'Brand',
      value: IconColor.BRAND,
      meta: { iconColor: IconColor.BRAND },
    },
    {
      label: 'Neutral',
      value: IconColor.NEUTRAL,
      meta: { iconColor: IconColor.NEUTRAL },
    },
    {
      label: 'Success',
      value: IconColor.SUCCESS,
      meta: { iconColor: IconColor.SUCCESS },
    },
    {
      label: 'Info',
      value: IconColor.INFO,
      meta: { iconColor: IconColor.INFO },
    },
    {
      label: 'Warning',
      value: IconColor.WARNING,
      meta: { iconColor: IconColor.WARNING },
    },
    {
      label: 'Warning High',
      value: IconColor.WARNING_HIGH,
      meta: { iconColor: IconColor.WARNING_HIGH },
    },
    {
      label: 'Danger',
      value: IconColor.DANGER,
      meta: { iconColor: IconColor.DANGER },
    },
  ];
  const sizeOptions: ComboboxOption<SizeMetaData>[] = [
    {
      label: 'Base (Default)',
      value: IconSize.BASE,
      meta: { iconSize: IconSize.BASE },
    },
    {
      label: 'Large',
      value: IconSize.LARGE,
      meta: { iconSize: IconSize.LARGE },
    },
    {
      label: 'Extra Large',
      value: IconSize.EXTRA_LARGE,
      meta: { iconSize: IconSize.EXTRA_LARGE },
    },
    {
      label: 'Extra Large 2',
      value: IconSize.EXTRA_LARGE2,
      meta: { iconSize: IconSize.EXTRA_LARGE2 },
    },
  ];
  const variantOptions: ComboboxOption<VariantMetaData>[] = [
    {
      label: 'Regular (Default)',
      value: IconVariant.REGULAR,
      meta: { iconVariant: IconVariant.REGULAR },
    },
    {
      label: 'Bold',
      value: IconVariant.BOLD,
      meta: { iconVariant: IconVariant.BOLD },
    },
    {
      label: 'Fill',
      value: IconVariant.FILL,
      meta: { iconVariant: IconVariant.FILL },
    },
  ];
  type ColorMetaData = { meta: { iconColor: IconColor } };
  type SizeMetaData = { meta: { iconSize: IconSize } };
  type VariantMetaData = { meta: { iconVariant: IconVariant } };
  const colorComboboxStore = comboboxComponentUtils.createValueStore<ColorMetaData>({
    defaultValue: [colorOptions[0]],
  });
  const sizeComboboxStore = comboboxComponentUtils.createValueStore<SizeMetaData>({
    defaultValue: [sizeOptions[0]],
  });
  const variantComboboxStore = comboboxComponentUtils.createValueStore<VariantMetaData>({
    defaultValue: [variantOptions[0]],
  });
  const [filter, setFilter] = createSignal<string>('');
  const [animate, setAnimate] = createSignal<boolean>(false);

  // the spread is needed to avoid a typescript error
  const [shownIconNames, setShownIconNames] = createSignal<IconName[]>([...supportedIconNames]);

  createEffect(function updateShownIconNames() {
    setShownIconNames(
      supportedIconNames.filter((iconName) => iconName.toLowerCase().includes(filter().toLowerCase())).sort(),
    );
  });

  return (
    <div>
      <FormFields>
        <FormField>
          <Label>Search</Label>
          <Input
            name="filter"
            value={filter()}
            placeholder="Search by name..."
            onInput={(event) => setFilter(event.currentTarget.value)}
          />
        </FormField>
        <FormField>
          <Checkbox
            labelElement="Animate"
            name="animate"
            onChange={(event) => setAnimate(event.currentTarget.checked)}
          />
        </FormField>
        <FormField>
          <Label>Color</Label>
          <Combobox
            forceSelection
            autoShowOptions
            options={colorOptions}
            // filterOptions={props.filterOptions ?? comboboxUtils.excludeSelectedFilter}
            setSelected={colorComboboxStore.setSelected}
            selected={colorComboboxStore.selected()}
            placeholder="Select color..."
            name="color"
          />
        </FormField>
        <FormField>
          <Label>Size</Label>
          <Combobox
            forceSelection
            autoShowOptions
            options={sizeOptions}
            // filterOptions={props.filterOptions ?? comboboxUtils.excludeSelectedFilter}
            setSelected={sizeComboboxStore.setSelected}
            selected={sizeComboboxStore.selected()}
            placeholder="Select size..."
            name="size"
          />
        </FormField>
        <FormField>
          <Label>Variant</Label>
          <Combobox
            forceSelection
            autoShowOptions
            options={variantOptions}
            // filterOptions={props.filterOptions ?? comboboxUtils.excludeSelectedFilter}
            setSelected={variantComboboxStore.setSelected}
            selected={variantComboboxStore.selected()}
            placeholder="Select variant..."
            name="variant"
          />
        </FormField>
      </FormFields>
      <div>
        Please check to see if an appropriate icon is available here before adding a new one. To search for new icons is
        one is needed,{' '}
        <Link href="https://phosphoricons.com/?q=circle" target="_blank" rel="noreferrer">
          go here
        </Link>
        .
      </div>
      <div class={styles.iconsContainer}>
        <For each={shownIconNames()}>
          {(iconName) => {
            const tooltipComponentRef = componentRefUtils.createRef<TooltipComponentRef>();

            return (
              <div class={styles.iconContainer}>
                <Tooltip tooltipComponentRef={tooltipComponentRef} triggerEvent={TooltipTriggerEvent.HOVER}>
                  <Tooltip.Handle>
                    <Icon
                      icon={iconName}
                      color={colorComboboxStore.selected()[0]?.meta?.iconColor || IconColor.INHERIT}
                      size={sizeComboboxStore.selected()[0]?.meta?.iconSize || IconSize.BASE}
                      onClick={() => clipboardUtils.copyToClipboard(iconName)}
                      variant={variantComboboxStore.selected()[0]?.meta?.iconVariant || IconVariant.REGULAR}
                      class={tailwindUtils.merge({
                        'animate-spin': animate(),
                      })}
                    />
                  </Tooltip.Handle>
                  <Tooltip.Content>{iconName}</Tooltip.Content>
                </Tooltip>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export const Clickable = () => {
  return <Icon icon="x" onClick={() => console.log('clicked')} />;
};
