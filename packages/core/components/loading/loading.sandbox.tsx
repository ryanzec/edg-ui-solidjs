import { IconSize } from '$/core/components/icon';
import Loading from '$/core/components/loading';
import styles from '$/core/components/loading/loading.sandbox.module.css';

export default {
  title: 'Components/Loading',
};

export const General = () => {
  return (
    <div>
      <Loading iconSize={IconSize.BASE} />
      <Loading iconSize={IconSize.LARGE} />
      <Loading iconSize={IconSize.EXTRA_LARGE} />
      <Loading iconSize={IconSize.EXTRA_LARGE2} />
    </div>
  );
};

export const InlineSection = () => {
  return (
    <>
      <div class={styles.section}>
        Overlayed content
        <Loading.Section>Section overlay loading asd asd asd asd asd asd asd asd</Loading.Section>
      </div>
      <div>Non-Overlayed content</div>
    </>
  );
};

export const WholePageSection = () => {
  return (
    <>
      <div class={styles.section}>
        Overlayed content
        <Loading.Section coverPage>Section overlay loading</Loading.Section>
      </div>
    </>
  );
};
