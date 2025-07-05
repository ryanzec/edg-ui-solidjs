import Badge, { BadgeColor, BadgeVariant } from '$/core/components/badge';
import Button from '$/core/components/button';
import Callout, { CalloutColor, CalloutVariant } from '$/core/components/callout';
import Icon from '$/core/components/icon';
import Loading from '$/core/components/loading';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Callout',
};

export const Variant = () => {
  return (
    <div>
      <h2>Weak</h2>
      <SandboxExamplesContainer>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.BRAND}>
          Brand
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.BRAND_SECONDARY}>
          Brand Secondary
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.NEUTRAL}>
          Neutral
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.SUCCESS}>
          Success
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.INFO}>
          Info
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.WARNING}>
          Warning
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.WARNING_HIGH}>
          Warning High
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.DANGER}>
          Danger
        </Callout>
      </SandboxExamplesContainer>
      <h2>Strong</h2>
      <SandboxExamplesContainer>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.BRAND}>
          Brand
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.BRAND_SECONDARY}>
          Brand Secondary
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.NEUTRAL}>
          Neutral
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.SUCCESS}>
          Success
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.INFO}>
          Info
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.WARNING}>
          Warning
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.WARNING_HIGH}>
          Warning High
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.DANGER}>
          Danger
        </Callout>
      </SandboxExamplesContainer>
    </div>
  );
};

const longCustomDataContent = (name: string, badgeColor: BadgeColor, badgeVariant: BadgeVariant) => (
  <>
    {name}
    <Badge color={badgeColor} variant={badgeVariant}>
      Badge
    </Badge>
    This is just some long extra content for testing purposes. This is just some long extra content for testing
    purposes. This is just some long extra content for testing purposes. This is just some long extra content for
    testing purposes. This is just some long extra content for testing purposes. This is just some long extra content
    for testing purposes.
  </>
);

export const CustomData = () => {
  return (
    <div>
      <h2>Weak</h2>
      <SandboxExamplesContainer>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.BRAND}>
          {longCustomDataContent('Brand', BadgeColor.BRAND, BadgeVariant.STRONG)}
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.BRAND_SECONDARY}>
          {longCustomDataContent('Brand Secondary', BadgeColor.BRAND_SECONDARY, BadgeVariant.STRONG)}
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.NEUTRAL}>
          {longCustomDataContent('Neutral', BadgeColor.NEUTRAL, BadgeVariant.STRONG)}
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.SUCCESS}>
          {longCustomDataContent('Success', BadgeColor.SUCCESS, BadgeVariant.STRONG)}
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.INFO}>
          {longCustomDataContent('Info', BadgeColor.INFO, BadgeVariant.STRONG)}
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.WARNING}>
          {longCustomDataContent('Warning', BadgeColor.WARNING, BadgeVariant.STRONG)}
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.WARNING_HIGH}>
          {longCustomDataContent('Warning High', BadgeColor.WARNING_HIGH, BadgeVariant.STRONG)}
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.DANGER}>
          {longCustomDataContent('Danger', BadgeColor.DANGER, BadgeVariant.STRONG)}
        </Callout>
      </SandboxExamplesContainer>
      <h2>Strong</h2>
      <SandboxExamplesContainer>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.BRAND}>
          {longCustomDataContent('Brand', BadgeColor.BRAND, BadgeVariant.WEAK)}
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.NEUTRAL}>
          {longCustomDataContent('Neutral', BadgeColor.NEUTRAL, BadgeVariant.WEAK)}
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.SUCCESS}>
          {longCustomDataContent('Success', BadgeColor.SUCCESS, BadgeVariant.WEAK)}
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.INFO}>
          {longCustomDataContent('Info', BadgeColor.INFO, BadgeVariant.WEAK)}
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.WARNING}>
          {longCustomDataContent('Warning', BadgeColor.WARNING, BadgeVariant.WEAK)}
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.WARNING_HIGH}>
          {longCustomDataContent('Warning High', BadgeColor.WARNING_HIGH, BadgeVariant.WEAK)}
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.DANGER}>
          {longCustomDataContent('Danger', BadgeColor.DANGER, BadgeVariant.WEAK)}
        </Callout>
      </SandboxExamplesContainer>
    </div>
  );
};

export const PrePostItems = () => {
  return (
    <div>
      <h2>Pre</h2>
      <SandboxExamplesContainer>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.BRAND} preElement={<Button>Button</Button>}>
          Brand
        </Callout>
        <Callout
          variant={CalloutVariant.WEAK}
          color={CalloutColor.BRAND_SECONDARY}
          preElement={<Button>Button</Button>}
        >
          Brand Secondary
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.NEUTRAL} preElement={<Icon icon="check" />}>
          Neutral
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.SUCCESS} preElement={<Icon icon="check" />}>
          Success
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.INFO} preElement={<Icon icon="check" />}>
          Info
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.WARNING} preElement={<Icon icon="check" />}>
          Warning
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.WARNING_HIGH} preElement={<Icon icon="check" />}>
          Warning High
        </Callout>
        <Callout variant={CalloutVariant.WEAK} color={CalloutColor.DANGER} preElement={<Icon icon="check" />}>
          Danger
        </Callout>
      </SandboxExamplesContainer>
      <h2>Post</h2>
      <SandboxExamplesContainer>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.BRAND} postElement={<Button>Button</Button>}>
          Brand
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.BRAND_SECONDARY}
          postElement={<Button>Button</Button>}
        >
          Brand Secondary
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.NEUTRAL} postElement={<Icon icon="check" />}>
          Neutral
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.SUCCESS} postElement={<Icon icon="check" />}>
          Success
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.INFO} postElement={<Icon icon="check" />}>
          Info
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.WARNING} postElement={<Icon icon="check" />}>
          Warning
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.WARNING_HIGH} postElement={<Icon icon="check" />}>
          Warning High
        </Callout>
        <Callout variant={CalloutVariant.STRONG} color={CalloutColor.DANGER} postElement={<Icon icon="check" />}>
          Danger
        </Callout>
      </SandboxExamplesContainer>
      <h2>Both</h2>
      <SandboxExamplesContainer>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.BRAND}
          preElement={<Button>Button</Button>}
          postElement={<Button>Button</Button>}
        >
          Brand
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.BRAND_SECONDARY}
          preElement={<Button>Button</Button>}
          postElement={<Button>Button</Button>}
        >
          Brand Secondary
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.NEUTRAL}
          preElement={<Icon icon="check" />}
          postElement={<Icon icon="check" />}
        >
          Neutral
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.SUCCESS}
          preElement={<Icon icon="check" />}
          postElement={<Icon icon="check" />}
        >
          Success
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.INFO}
          preElement={<Icon icon="check" />}
          postElement={<Icon icon="check" />}
        >
          Info
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.WARNING}
          preElement={<Icon icon="check" />}
          postElement={<Icon icon="check" />}
        >
          Warning
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.WARNING_HIGH}
          preElement={<Icon icon="check" />}
          postElement={<Icon icon="check" />}
        >
          Warning High
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.DANGER}
          preElement={<Icon icon="check" />}
          postElement={<Icon icon="check" />}
        >
          Danger
        </Callout>
      </SandboxExamplesContainer>
    </div>
  );
};

export const NoSideBorder = () => {
  return (
    <div>
      <h2>Pre</h2>
      <SandboxExamplesContainer>
        <Callout
          variant={CalloutVariant.WEAK}
          color={CalloutColor.BRAND}
          preElement={<Button>Button</Button>}
          hasSideBorder={false}
        >
          Brand
        </Callout>
        <Callout
          variant={CalloutVariant.WEAK}
          color={CalloutColor.BRAND_SECONDARY}
          preElement={<Button>Button</Button>}
          hasSideBorder={false}
        >
          Brand Secondary
        </Callout>
        <Callout
          variant={CalloutVariant.WEAK}
          color={CalloutColor.NEUTRAL}
          preElement={<Icon icon="check" />}
          hasSideBorder={false}
        >
          Neutral
        </Callout>
        <Callout
          variant={CalloutVariant.WEAK}
          color={CalloutColor.SUCCESS}
          preElement={<Icon icon="check" />}
          hasSideBorder={false}
        >
          Success
        </Callout>
        <Callout
          variant={CalloutVariant.WEAK}
          color={CalloutColor.INFO}
          preElement={<Icon icon="check" />}
          hasSideBorder={false}
        >
          Info
        </Callout>
        <Callout
          variant={CalloutVariant.WEAK}
          color={CalloutColor.WARNING}
          preElement={<Icon icon="check" />}
          hasSideBorder={false}
        >
          Warning
        </Callout>
        <Callout
          variant={CalloutVariant.WEAK}
          color={CalloutColor.WARNING_HIGH}
          preElement={<Icon icon="check" />}
          hasSideBorder={false}
        >
          Warning High
        </Callout>
        <Callout
          variant={CalloutVariant.WEAK}
          color={CalloutColor.DANGER}
          preElement={<Icon icon="check" />}
          hasSideBorder={false}
        >
          Danger
        </Callout>
      </SandboxExamplesContainer>
      <h2>Post</h2>
      <SandboxExamplesContainer>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.BRAND}
          postElement={<Button>Button</Button>}
          hasSideBorder={false}
        >
          Brand
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.BRAND_SECONDARY}
          postElement={<Button>Button</Button>}
          hasSideBorder={false}
        >
          Brand Secondary
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.NEUTRAL}
          postElement={<Icon icon="check" />}
          hasSideBorder={false}
        >
          Neutral
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.SUCCESS}
          postElement={<Icon icon="check" />}
          hasSideBorder={false}
        >
          Success
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.INFO}
          postElement={<Icon icon="check" />}
          hasSideBorder={false}
        >
          Info
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.WARNING}
          postElement={<Icon icon="check" />}
          hasSideBorder={false}
        >
          Warning
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.WARNING_HIGH}
          postElement={<Icon icon="check" />}
          hasSideBorder={false}
        >
          Warning High
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.DANGER}
          postElement={<Icon icon="check" />}
          hasSideBorder={false}
        >
          Danger
        </Callout>
      </SandboxExamplesContainer>
      <h2>Both</h2>
      <SandboxExamplesContainer>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.BRAND}
          preElement={<Button>Button</Button>}
          postElement={<Button>Button</Button>}
        >
          Brand
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.BRAND_SECONDARY}
          preElement={<Button>Button</Button>}
          postElement={<Button>Button</Button>}
        >
          Brand Secondary
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.NEUTRAL}
          preElement={<Icon icon="check" />}
          postElement={<Icon icon="check" />}
        >
          Neutral
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.SUCCESS}
          preElement={<Icon icon="check" />}
          postElement={<Icon icon="check" />}
        >
          Success
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.INFO}
          preElement={<Icon icon="check" />}
          postElement={<Icon icon="check" />}
        >
          Info
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.WARNING}
          preElement={<Icon icon="check" />}
          postElement={<Icon icon="check" />}
        >
          Warning
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.WARNING_HIGH}
          preElement={<Icon icon="check" />}
          postElement={<Icon icon="check" />}
        >
          Warning High
        </Callout>
        <Callout
          variant={CalloutVariant.STRONG}
          color={CalloutColor.DANGER}
          preElement={<Icon icon="check" />}
          postElement={<Icon icon="check" />}
        >
          Danger
        </Callout>
      </SandboxExamplesContainer>
    </div>
  );
};

export const ExtraContentElement = () => {
  return (
    <div>
      <SandboxExamplesContainer>
        <Callout
          variant={CalloutVariant.WEAK}
          color={CalloutColor.BRAND}
          extraContentElement={<div>Extra Content</div>}
        >
          Brand
        </Callout>
        <Callout
          variant={CalloutVariant.WEAK}
          color={CalloutColor.BRAND_SECONDARY}
          extraContentElement={<div>Extra Content</div>}
        >
          <div class="flex gap-3xs">
            <Loading /> Loading Content...
          </div>
        </Callout>
      </SandboxExamplesContainer>
    </div>
  );
};
