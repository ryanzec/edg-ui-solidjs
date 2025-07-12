import Button, { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '$/core/components/button';
import { ButtonState } from '$/core/components/button/utils';
import Icon from '$/core/components/icon';
import List from '$/core/components/list';
import type { TooltipComponentRef } from '$/core/components/tooltip';
import { createComponentRef } from '$/core/stores/component-ref';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Button',
};

export const Variants = () => {
  return (
    <>
      <SandboxExamplesContainer>
        <div>
          <div>Filled</div>
          <Button.Group>
            <Button>Filled</Button>
            <Button variant={ButtonVariant.FILLED} preElement={<Icon icon="plus" />}>
              Filled
            </Button>
            <Button variant={ButtonVariant.FILLED} postElement={<Icon icon="plus" />}>
              Filled
            </Button>
            <Button variant={ButtonVariant.FILLED} preElement={<Icon icon="plus" />} postElement={<Icon icon="plus" />}>
              Filled
            </Button>
            <Button variant={ButtonVariant.FILLED} disabled>
              Filled (Disabled)
            </Button>
          </Button.Group>
        </div>
      </SandboxExamplesContainer>
      <SandboxExamplesContainer>
        <div>
          <div>Weak</div>
          <Button.Group>
            <Button variant={ButtonVariant.WEAK}>Filled</Button>
            <Button variant={ButtonVariant.WEAK} preElement={<Icon icon="plus" />}>
              Weak
            </Button>
            <Button variant={ButtonVariant.WEAK} postElement={<Icon icon="plus" />}>
              Weak
            </Button>
            <Button variant={ButtonVariant.WEAK} preElement={<Icon icon="plus" />} postElement={<Icon icon="plus" />}>
              Weak
            </Button>
            <Button variant={ButtonVariant.WEAK} disabled>
              Weak (Disabled)
            </Button>
          </Button.Group>
        </div>
      </SandboxExamplesContainer>
      <SandboxExamplesContainer>
        <div>
          <div>Outlined</div>
          <Button.Group>
            <Button variant={ButtonVariant.OUTLINED}>Outlined</Button>
            <Button variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />}>
              Outlined
            </Button>
            <Button variant={ButtonVariant.OUTLINED} postElement={<Icon icon="plus" />}>
              Outlined
            </Button>
            <Button
              variant={ButtonVariant.OUTLINED}
              preElement={<Icon icon="plus" />}
              postElement={<Icon icon="plus" />}
            >
              Outlined
            </Button>
            <Button variant={ButtonVariant.OUTLINED} disabled>
              Outlined (Disabled)
            </Button>
          </Button.Group>
        </div>
      </SandboxExamplesContainer>
      <SandboxExamplesContainer>
        <div>
          <div>Ghost</div>
          <Button.Group>
            <Button variant={ButtonVariant.GHOST}>Outlined</Button>
            <Button variant={ButtonVariant.GHOST} preElement={<Icon icon="plus" />}>
              Outlined
            </Button>
            <Button variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />}>
              Outlined
            </Button>
            <Button variant={ButtonVariant.GHOST} preElement={<Icon icon="plus" />} postElement={<Icon icon="plus" />}>
              Outlined
            </Button>
            <Button variant={ButtonVariant.GHOST} disabled>
              Outlined (Disabled)
            </Button>
          </Button.Group>
        </div>
      </SandboxExamplesContainer>
    </>
  );
};

export const Colors = () => {
  return (
    <>
      <Button.Group>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />} disabled>
          Outlined
        </Button>
        <Button color={ButtonColor.BRAND} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />} disabled>
          Ghost
        </Button>
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.BRAND} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.FILLED} />
        <Button color={ButtonColor.BRAND} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.WEAK} />
        <Button
          color={ButtonColor.BRAND}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
        />
        <Button color={ButtonColor.BRAND} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.GHOST} />
        <Button
          color={ButtonColor.BRAND}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          color={ButtonColor.BRAND}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          color={ButtonColor.BRAND}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          color={ButtonColor.BRAND}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.BRAND_SECONDARY} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.BRAND_SECONDARY} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.BRAND_SECONDARY} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.BRAND_SECONDARY} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button color={ButtonColor.BRAND_SECONDARY} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.BRAND_SECONDARY} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button
          color={ButtonColor.BRAND_SECONDARY}
          variant={ButtonVariant.OUTLINED}
          preElement={<Icon icon="plus" />}
          disabled
        >
          Outlined
        </Button>
        <Button
          color={ButtonColor.BRAND_SECONDARY}
          variant={ButtonVariant.GHOST}
          postElement={<Icon icon="plus" />}
          disabled
        >
          Ghost
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          color={ButtonColor.BRAND_SECONDARY}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
        />
        <Button
          color={ButtonColor.BRAND_SECONDARY}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.WEAK}
        />
        <Button
          color={ButtonColor.BRAND_SECONDARY}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
        />
        <Button
          color={ButtonColor.BRAND_SECONDARY}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.GHOST}
        />
        <Button
          color={ButtonColor.BRAND_SECONDARY}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          color={ButtonColor.BRAND_SECONDARY}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          color={ButtonColor.BRAND_SECONDARY}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          color={ButtonColor.BRAND_SECONDARY}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />} disabled>
          Outlined
        </Button>
        <Button color={ButtonColor.NEUTRAL} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />} disabled>
          Ghost
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          color={ButtonColor.NEUTRAL}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
        />
        <Button color={ButtonColor.NEUTRAL} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.WEAK} />
        <Button
          color={ButtonColor.NEUTRAL}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
        />
        <Button color={ButtonColor.NEUTRAL} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.GHOST} />
        <Button
          color={ButtonColor.NEUTRAL}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          color={ButtonColor.NEUTRAL}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          color={ButtonColor.NEUTRAL}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          color={ButtonColor.NEUTRAL}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />} disabled>
          Outlined
        </Button>
        <Button color={ButtonColor.SUCCESS} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />} disabled>
          Ghost
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          color={ButtonColor.SUCCESS}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
        />
        <Button color={ButtonColor.SUCCESS} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.WEAK} />
        <Button
          color={ButtonColor.SUCCESS}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
        />
        <Button color={ButtonColor.SUCCESS} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.GHOST} />
        <Button
          color={ButtonColor.SUCCESS}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          color={ButtonColor.SUCCESS}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          color={ButtonColor.SUCCESS}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          color={ButtonColor.SUCCESS}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />} disabled>
          Outlined
        </Button>
        <Button color={ButtonColor.INFO} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />} disabled>
          Ghost
        </Button>
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.INFO} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.FILLED} />
        <Button color={ButtonColor.INFO} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.WEAK} />
        <Button color={ButtonColor.INFO} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.OUTLINED} />
        <Button color={ButtonColor.INFO} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.GHOST} />
        <Button
          color={ButtonColor.INFO}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          color={ButtonColor.INFO}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          color={ButtonColor.INFO}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          color={ButtonColor.INFO}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />} disabled>
          Outlined
        </Button>
        <Button color={ButtonColor.WARNING} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />} disabled>
          Ghost
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          color={ButtonColor.WARNING}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
        />
        <Button color={ButtonColor.WARNING} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.WEAK} />
        <Button
          color={ButtonColor.WARNING}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
        />
        <Button color={ButtonColor.WARNING} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.GHOST} />
        <Button
          color={ButtonColor.WARNING}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          color={ButtonColor.WARNING}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          color={ButtonColor.WARNING}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          color={ButtonColor.WARNING}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.WARNING_HIGH} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.WARNING_HIGH} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.WARNING_HIGH} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.WARNING_HIGH} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button color={ButtonColor.WARNING_HIGH} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.WARNING_HIGH} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button
          color={ButtonColor.WARNING_HIGH}
          variant={ButtonVariant.OUTLINED}
          preElement={<Icon icon="plus" />}
          disabled
        >
          Outlined
        </Button>
        <Button
          color={ButtonColor.WARNING_HIGH}
          variant={ButtonVariant.GHOST}
          postElement={<Icon icon="plus" />}
          disabled
        >
          Ghost
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          color={ButtonColor.WARNING_HIGH}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
        />
        <Button
          color={ButtonColor.WARNING_HIGH}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.WEAK}
        />
        <Button
          color={ButtonColor.WARNING_HIGH}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
        />
        <Button
          color={ButtonColor.WARNING_HIGH}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.GHOST}
        />
        <Button
          color={ButtonColor.WARNING_HIGH}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          color={ButtonColor.WARNING_HIGH}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          color={ButtonColor.WARNING_HIGH}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          color={ButtonColor.WARNING_HIGH}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.FILLED}>
          Filled
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.WEAK}>
          Weak
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />}>
          Outlined
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />}>
          Ghost
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.FILLED} disabled>
          Filled
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.WEAK} disabled>
          Weak
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.OUTLINED} preElement={<Icon icon="plus" />} disabled>
          Outlined
        </Button>
        <Button color={ButtonColor.DANGER} variant={ButtonVariant.GHOST} postElement={<Icon icon="plus" />} disabled>
          Ghost
        </Button>
      </Button.Group>
      <Button.Group>
        <Button color={ButtonColor.DANGER} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.FILLED} />
        <Button color={ButtonColor.DANGER} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.WEAK} />
        <Button
          color={ButtonColor.DANGER}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
        />
        <Button color={ButtonColor.DANGER} postElement={<Icon icon="question-mark" />} variant={ButtonVariant.GHOST} />
        <Button
          color={ButtonColor.DANGER}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
          disabled
        />
        <Button
          color={ButtonColor.DANGER}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.WEAK}
          disabled
        />
        <Button
          color={ButtonColor.DANGER}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.OUTLINED}
          disabled
        />
        <Button
          color={ButtonColor.DANGER}
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.GHOST}
          disabled
        />
      </Button.Group>
    </>
  );
};

export const Icons = () => {
  return (
    <SandboxExamplesContainer>
      <SandboxExamplesContainer asRow>
        <Button variant={ButtonVariant.FILLED} color={ButtonColor.BRAND}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.FILLED} color={ButtonColor.NEUTRAL}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.FILLED} color={ButtonColor.SUCCESS}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.FILLED} color={ButtonColor.INFO}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.FILLED} color={ButtonColor.WARNING}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.FILLED} color={ButtonColor.DANGER}>
          <Icon icon="spinner" />
        </Button>
      </SandboxExamplesContainer>
      <SandboxExamplesContainer asRow>
        <Button variant={ButtonVariant.OUTLINED} color={ButtonColor.BRAND}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.OUTLINED} color={ButtonColor.NEUTRAL}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.OUTLINED} color={ButtonColor.SUCCESS}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.OUTLINED} color={ButtonColor.INFO}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.OUTLINED} color={ButtonColor.WARNING}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.OUTLINED} color={ButtonColor.DANGER}>
          <Icon icon="spinner" />
        </Button>
      </SandboxExamplesContainer>
      <SandboxExamplesContainer asRow>
        <Button variant={ButtonVariant.WEAK} color={ButtonColor.BRAND}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.WEAK} color={ButtonColor.NEUTRAL}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.WEAK} color={ButtonColor.SUCCESS}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.WEAK} color={ButtonColor.INFO}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.WEAK} color={ButtonColor.WARNING}>
          <Icon icon="spinner" />
        </Button>
        <Button variant={ButtonVariant.WEAK} color={ButtonColor.DANGER}>
          <Icon icon="spinner" />
        </Button>
      </SandboxExamplesContainer>
    </SandboxExamplesContainer>
  );
};

export const Shapes = () => {
  return (
    <>
      <Button shape={ButtonShape.CIRCLE} variant={ButtonVariant.FILLED}>
        <Icon icon="question-mark" />
      </Button>
      <Button shape={ButtonShape.ROUNDED} variant={ButtonVariant.FILLED}>
        Rounded
      </Button>
    </>
  );
};

export const PrePostItems = () => {
  return (
    <>
      <div>Pre Item</div>
      <Button preElement={<Icon icon="question-mark" />} variant={ButtonVariant.FILLED}>
        Button
      </Button>
      <div>Pre Item</div>
      <Button postElement={<Icon icon="question-mark" />} variant={ButtonVariant.FILLED}>
        Button
      </Button>
      <div>Pre and Post Item</div>
      <Button
        preElement={<Icon icon="question-mark" />}
        postElement={<Icon icon="question-mark" />}
        variant={ButtonVariant.FILLED}
      >
        Button
      </Button>
    </>
  );
};

export const Toggle = () => {
  return (
    <>
      <Button.Group isAttached>
        <Button.Toggle postElement={<Icon icon="question-mark" />} />
        <Button.Toggle>Weak</Button.Toggle>
        <Button.Toggle isSelected preElement={<Icon icon="plus" />}>
          Outlined
        </Button.Toggle>
        <Button.Toggle postElement={<Icon icon="plus" />} />
        <Button.Toggle preElement={<Icon icon="plus" />} postElement={<Icon icon="plus" />}>
          Text
        </Button.Toggle>
        <Button.Toggle disabled>Filled</Button.Toggle>
        <Button.Toggle disabled>Weak</Button.Toggle>
        <Button.Toggle preElement={<Icon icon="plus" />} disabled>
          Outlined
        </Button.Toggle>
        <Button.Toggle postElement={<Icon icon="plus" />} disabled>
          Ghost
        </Button.Toggle>
        <Button.Toggle preElement={<Icon icon="plus" />} postElement={<Icon icon="plus" />} disabled>
          Text
        </Button.Toggle>
      </Button.Group>
    </>
  );
};

export const Loading = () => {
  return (
    <>
      <Button.Group>
        <Button
          postElement={<Icon icon="question-mark" />}
          variant={ButtonVariant.FILLED}
          state={ButtonState.IS_LOADING}
        />
        <Button
          color={ButtonColor.WARNING}
          variant={ButtonVariant.FILLED}
          state={ButtonState.IS_LOADING}
          preElement={<Icon icon="plus" />}
        >
          Filled
        </Button>
        <Button
          color={ButtonColor.WARNING}
          variant={ButtonVariant.OUTLINED}
          state={ButtonState.IS_LOADING}
          postElement={<Icon icon="plus" />}
        >
          Outline
        </Button>
        <Button
          color={ButtonColor.WARNING}
          variant={ButtonVariant.GHOST}
          state={ButtonState.IS_LOADING}
          preElement={<Icon icon="plus" />}
          postElement={<Icon icon="plus" />}
        >
          Ghost
        </Button>
      </Button.Group>
    </>
  );
};

export const DropDown = () => {
  const tooltipComponentRef1 = createComponentRef<TooltipComponentRef>();
  const tooltipComponentRef2 = createComponentRef<TooltipComponentRef>();
  const tooltipComponentRef3 = createComponentRef<TooltipComponentRef>();

  const handleAction = () => {
    console.log('action');

    tooltipComponentRef1.api()?.hide();
    tooltipComponentRef2.api()?.hide();
    tooltipComponentRef3.api()?.hide();
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Button.DropDown label="Drop Down" tooltipComponentRef={tooltipComponentRef1}>
        <>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>with a really long item</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
        </>
      </Button.DropDown>
      <Button.DropDown label="Drop Down" tooltipComponentRef={tooltipComponentRef2}>
        <>
          <List.Item onClick={handleAction}>a</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>sa</List.Item>
          <List.Item onClick={handleAction}>vdd</List.Item>
        </>
      </Button.DropDown>
      <br />
      <br />
      <br />
      <br />
      <Button.DropDown
        variant={ButtonVariant.WEAK}
        color={ButtonColor.NEUTRAL}
        label="Extra Long Drop Down"
        tooltipComponentRef={tooltipComponentRef3}
      >
        <>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>with a really long item</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>with a really long item</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>with a really long item</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>with a really long item</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>with a really long item</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>with a really long item</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>with a really long item</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>with a really long item</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
          <List.Item onClick={handleAction}>with a really long item</List.Item>
          <List.Item onClick={handleAction}>Logout</List.Item>
        </>
      </Button.DropDown>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      test
    </>
  );
};

export const Sizes = () => {
  return (
    <SandboxExamplesContainer>
      <SandboxExamplesContainer>
        <div>Base</div>
        <Button.Group>
          <Button size={ButtonSize.BASE} variant={ButtonVariant.FILLED}>
            Base
          </Button>
          <Button size={ButtonSize.BASE} variant={ButtonVariant.FILLED} preElement={<Icon icon="plus" />}>
            Base
          </Button>
          <Button size={ButtonSize.BASE} variant={ButtonVariant.FILLED} postElement={<Icon icon="plus" />}>
            Base
          </Button>
          <Button size={ButtonSize.BASE} variant={ButtonVariant.FILLED} shape={ButtonShape.CIRCLE} icon="x" />
          <Button size={ButtonSize.BASE} variant={ButtonVariant.FILLED} shape={ButtonShape.CIRCLE} icon="plus" />
          <Button size={ButtonSize.BASE} variant={ButtonVariant.FILLED} disabled>
            Base (Disabled)
          </Button>
        </Button.Group>
      </SandboxExamplesContainer>
      <SandboxExamplesContainer>
        <div>Small</div>
        <Button.Group>
          <Button size={ButtonSize.SMALL} variant={ButtonVariant.FILLED}>
            Base
          </Button>
          <Button size={ButtonSize.SMALL} variant={ButtonVariant.FILLED} preElement={<Icon icon="plus" />}>
            Base
          </Button>
          <Button size={ButtonSize.SMALL} variant={ButtonVariant.FILLED} postElement={<Icon icon="plus" />}>
            Base
          </Button>
          <Button size={ButtonSize.SMALL} variant={ButtonVariant.FILLED} shape={ButtonShape.CIRCLE} icon="x" />
          <Button size={ButtonSize.SMALL} variant={ButtonVariant.FILLED} shape={ButtonShape.CIRCLE} icon="plus" />
          <Button size={ButtonSize.SMALL} variant={ButtonVariant.FILLED} disabled>
            Base (Disabled)
          </Button>
        </Button.Group>
      </SandboxExamplesContainer>
    </SandboxExamplesContainer>
  );
};

export const Marker = () => {
  return (
    <SandboxExamplesContainer>
      <Button.Group>
        <Button marker="BETA">Marker Button</Button>
        <Button marker="BETA">Marker</Button>
      </Button.Group>
    </SandboxExamplesContainer>
  );
};
