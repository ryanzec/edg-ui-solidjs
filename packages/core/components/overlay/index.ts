import { default as BaseOverlay } from '$/core/components/overlay/overlay';
import Content from '$/core/components/overlay/overlay-content';
import ContentLocal from '$/core/components/overlay/overlay-content-local';
import Local from '$/core/components/overlay/overlay-local';
import type { OverlayProps } from '$/core/components/overlay/utils';

export type { OverlayProps };

export { OverlayVariant } from '$/core/components/overlay/utils';

export const Overlay = Object.assign(BaseOverlay, { Content, Local, ContentLocal });

export default Overlay;
