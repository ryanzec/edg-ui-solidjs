import { IconSize } from '$/core/components/icon';
import Loading from '$/core/components/loading/index';
import styles from '$/core/components/loading/loading.sandbox.module.css';

export default {
  title: 'Components/Loading',
};

export const General = () => {
  return (
    <div>
      <Loading iconSize={IconSize.SMALL} />
      <Loading iconSize={IconSize.BASE} />
      <Loading iconSize={IconSize.LARGE} />
      <Loading iconSize={IconSize.EXTRA_LARGE} />
      <Loading iconSize={IconSize.EXTRA_LARGE2} />
    </div>
  );
};

export const Section = () => {
  return (
    <>
      <div class={styles.section}>
        Overlayed content
        <Loading.Section>Section overlay loading</Loading.Section>
      </div>
      <div>Non-Overlayed content</div>
    </>
  );
};
