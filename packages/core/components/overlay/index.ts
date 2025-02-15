import Overlay from '$/core/components/overlay/overlay';
import Content from '$/core/components/overlay/overlay-content';
import ContentLocal from '$/core/components/overlay/overlay-content-local';
import Local from '$/core/components/overlay/overlay-local';

export { OverlayVariant } from '$/core/components/overlay/utils';
export type { OverlayProps } from '$/core/components/overlay/utils';

export default Object.assign(Overlay, { Content, Local, ContentLocal });
