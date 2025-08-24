import { type JSX, Show, useContext } from 'solid-js';
import ApplicationFrameSeparator from '$/application/components/application-frame/application-frame-separator';
import { ApplicationFrameContextComponent } from '$/application/components/application-frame/utils';
import Typography, { TypographyColor, TypographySize } from '$/core/components/typography';
import { loggerUtils } from '$/core/utils/logger';

export type ApplicationFrameSectionHeaderProps = {
  children: JSX.Element;
};

const ApplicationFrameSectionHeader = (props: ApplicationFrameSectionHeaderProps) => {
  const applicationFrameContext = useContext(ApplicationFrameContextComponent);

  if (!applicationFrameContext) {
    loggerUtils.error({
      type: 'application-frame-context-not-found',
    });

    return null;
  }

  return (
    <Show when={applicationFrameContext.sidebarToggleStore.isToggled()} fallback={<ApplicationFrameSeparator />}>
      <Typography
        data-id="application-frame-section-header"
        class="px-2xs font-semibold mt-xs"
        size={TypographySize.SMALL}
        color={TypographyColor.NEUTRAL}
        {...props}
      />
    </Show>
  );
};

export default ApplicationFrameSectionHeader;
