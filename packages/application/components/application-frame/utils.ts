import { type Accessor, createContext } from 'solid-js';
import type { ToggleStore } from '$/core/stores/toggle.store';

export type ApplicationFrameContext = {
  sidebarToggleStore: ToggleStore;
  forceFullHeight: Accessor<boolean>;
  setForceFullHeight: (limit: boolean) => void;
};

export const ApplicationFrameContextComponent = createContext<ApplicationFrameContext>();
