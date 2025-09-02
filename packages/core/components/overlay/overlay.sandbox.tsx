import { createSignal, Show } from 'solid-js';

import Button, { ButtonColor } from '$/core/components/button';
import Overlay from '$/core/components/overlay';

export default {
  title: 'Components/Overlay',
};

export const Default = () => {
  const [overlayToggled, setOverlayToggled] = createSignal(false);
  const [overlayToggledWeak, setOverlayToggledWeak] = createSignal(false);

  return (
    <>
      <div>
        <Button
          onClick={() => {
            setOverlayToggled(!overlayToggled());
          }}
        >
          Toggle Overlay
        </Button>
        <Show when={overlayToggled()}>
          <Overlay.Content>
            <Button
              color={ButtonColor.BRAND}
              onClick={() => {
                setOverlayToggled(!overlayToggled());
              }}
            >
              Close Overlay
            </Button>
          </Overlay.Content>
          <Overlay />
        </Show>
      </div>
      <div>
        <Button
          onClick={() => {
            setOverlayToggledWeak(!overlayToggledWeak());
          }}
        >
          Toggle Overlay (Weak)
        </Button>
        <Show when={overlayToggledWeak()}>
          <Overlay.Content>
            <Button
              color={ButtonColor.BRAND}
              onClick={() => {
                setOverlayToggledWeak(!overlayToggledWeak());
              }}
            >
              Close Overlay
            </Button>
          </Overlay.Content>
          <Overlay />
        </Show>
      </div>
    </>
  );
};

export const Local = () => {
  const [overlayToggled, setOverlayToggled] = createSignal(false);

  return (
    <div style={{ position: 'relative' }}>
      <Button
        onClick={() => {
          setOverlayToggled(!overlayToggled());
        }}
      >
        Toggle Overlay
      </Button>
      <Show when={overlayToggled()}>
        <Overlay.ContentLocal>
          <Button
            color={ButtonColor.BRAND}
            onClick={() => {
              setOverlayToggled(!overlayToggled());
            }}
          >
            Close Overlay
          </Button>
        </Overlay.ContentLocal>
        <Overlay.Local />
      </Show>
    </div>
  );
};

export const LocalLimitedWidth = () => {
  const [overlayToggled, setOverlayToggled] = createSignal(false);
  const [overlayToggled2, setOverlayToggled2] = createSignal(false);

  return (
    <div>
      <Button
        onClick={() => {
          setOverlayToggled(!overlayToggled());
        }}
      >
        Toggle Overlay
      </Button>
      <Button
        onClick={() => {
          setOverlayToggled2(!overlayToggled2());
        }}
      >
        Toggle Overlay that wraps
      </Button>
      <div class="relative w-[500px] h-[100px]">
        <Show when={overlayToggled()}>
          <Overlay.ContentLocal>This is extra long content to see if wrapping is avoided properly</Overlay.ContentLocal>
          <Overlay.Local />
        </Show>
        <Show when={overlayToggled2()}>
          <Overlay.ContentLocal>
            This is extra long content to make sure the the wrapping functionality still works when it is truely
            required.
          </Overlay.ContentLocal>
          <Overlay.Local />
        </Show>
      </div>
    </div>
  );
};
