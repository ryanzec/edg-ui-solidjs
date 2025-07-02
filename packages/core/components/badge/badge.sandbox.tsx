import Badge, { BadgeColor, BadgeSize, BadgeVariant } from '$/core/components/badge';
import { BadgeShape } from '$/core/components/badge/utils';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Badge',
};

export const Variant = () => {
  return (
    <div>
      <h2>Weak</h2>
      <SandboxExamplesContainer asRow>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.NEUTRAL}>
          Neutral
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.BRAND}>
          Brand
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.BRAND_SECONDARY}>
          Brand Secondary
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.SUCCESS}>
          Success
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.INFO}>
          Info
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.WARNING}>
          Warning
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.WARNING_HIGH}>
          Warning High
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.DANGER}>
          Danger
        </Badge>
      </SandboxExamplesContainer>
      <h2>Strong</h2>
      <SandboxExamplesContainer asRow>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.NEUTRAL}>
          Neutral
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.BRAND}>
          Brand
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.BRAND_SECONDARY}>
          Brand Secondary
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.SUCCESS}>
          Success
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.INFO}>
          Info
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.WARNING}>
          Warning
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.WARNING_HIGH}>
          Warning High
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.DANGER}>
          Danger
        </Badge>
      </SandboxExamplesContainer>
      <h2>Transparent</h2>
      <SandboxExamplesContainer asRow>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.NEUTRAL}>
          Neutral
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.BRAND}>
          Brand
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.BRAND_SECONDARY}>
          Brand Secondary
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.SUCCESS}>
          Success
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.INFO}>
          Info
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.WARNING}>
          Warning
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.WARNING_HIGH}>
          Warning High
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.DANGER}>
          Danger
        </Badge>
      </SandboxExamplesContainer>
    </div>
  );
};

export const Icons = () => {
  return (
    <SandboxExamplesContainer>
      <h2>Weak</h2>
      <SandboxExamplesContainer asRow>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.NEUTRAL} preIcon="check">
          Neutral
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.BRAND} postIcon="check">
          Brand
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.BRAND_SECONDARY} postIcon="check">
          Brand Secondary
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.SUCCESS} preIcon="check" postIcon="check">
          Success
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.INFO} preIcon="check">
          Info
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.WARNING} postIcon="check">
          Warning
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.WARNING_HIGH} postIcon="check">
          Warning High
        </Badge>
        <Badge variant={BadgeVariant.WEAK} color={BadgeColor.DANGER} preIcon="check" postIcon="check">
          Danger
        </Badge>
      </SandboxExamplesContainer>
      <h2>Strong</h2>
      <SandboxExamplesContainer asRow>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.NEUTRAL} preIcon="check">
          Neutral
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.BRAND} postIcon="check">
          Brand
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.BRAND_SECONDARY} postIcon="check">
          Brand Secondary
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.SUCCESS} preIcon="check" postIcon="check">
          Success
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.INFO} preIcon="check">
          Info
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.WARNING} postIcon="check">
          Warning
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.WARNING_HIGH} postIcon="check">
          Warning High
        </Badge>
        <Badge variant={BadgeVariant.STRONG} color={BadgeColor.DANGER} preIcon="check" postIcon="check">
          Danger
        </Badge>
      </SandboxExamplesContainer>
      <h2>Transparent</h2>
      <SandboxExamplesContainer asRow>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.NEUTRAL} preIcon="check">
          Neutral
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.BRAND} postIcon="check">
          Brand
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.BRAND_SECONDARY} postIcon="check">
          Brand Secondary
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.SUCCESS} preIcon="check" postIcon="check">
          Success
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.INFO} preIcon="check">
          Info
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.WARNING} postIcon="check">
          Warning
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.WARNING_HIGH} postIcon="check">
          Warning High
        </Badge>
        <Badge variant={BadgeVariant.TRANSPARENT} color={BadgeColor.DANGER} preIcon="check" postIcon="check">
          Danger
        </Badge>
      </SandboxExamplesContainer>
    </SandboxExamplesContainer>
  );
};

export const Shapes = () => {
  return (
    <SandboxExamplesContainer asRow isFull={false}>
      <Badge shape={BadgeShape.ROUNDED} variant={BadgeVariant.STRONG} color={BadgeColor.BRAND} preIcon="check">
        Rounded
      </Badge>
      <Badge shape={BadgeShape.PILL} variant={BadgeVariant.STRONG} color={BadgeColor.SUCCESS} postIcon="check">
        Pill
      </Badge>
    </SandboxExamplesContainer>
  );
};

export const Size = () => {
  return (
    <div>
      <h2>Small</h2>
      <SandboxExamplesContainer asRow>
        <Badge size={BadgeSize.SMALL} variant={BadgeVariant.STRONG} color={BadgeColor.BRAND} preIcon="check">
          Brand
        </Badge>
        <Badge size={BadgeSize.SMALL} variant={BadgeVariant.STRONG} color={BadgeColor.SUCCESS} postIcon="check">
          Success
        </Badge>
        <Badge
          size={BadgeSize.SMALL}
          variant={BadgeVariant.STRONG}
          color={BadgeColor.INFO}
          preIcon="check"
          postIcon="check"
        >
          Info
        </Badge>
      </SandboxExamplesContainer>
      <h2>Medium</h2>
      <SandboxExamplesContainer asRow>
        <Badge size={BadgeSize.MEDIUM} variant={BadgeVariant.STRONG} color={BadgeColor.BRAND} preIcon="check">
          Primary
        </Badge>
        <Badge size={BadgeSize.MEDIUM} variant={BadgeVariant.STRONG} color={BadgeColor.SUCCESS} postIcon="check">
          Success
        </Badge>
        <Badge
          size={BadgeSize.MEDIUM}
          variant={BadgeVariant.STRONG}
          color={BadgeColor.INFO}
          preIcon="check"
          postIcon="check"
        >
          Info
        </Badge>
      </SandboxExamplesContainer>
      <h2>Large/</h2>
      <SandboxExamplesContainer asRow>
        <Badge size={BadgeSize.LARGE} variant={BadgeVariant.STRONG} color={BadgeColor.BRAND} preIcon="check">
          Primary
        </Badge>
        <Badge size={BadgeSize.LARGE} variant={BadgeVariant.STRONG} color={BadgeColor.SUCCESS} postIcon="check">
          Success
        </Badge>
        <Badge
          size={BadgeSize.LARGE}
          variant={BadgeVariant.STRONG}
          color={BadgeColor.INFO}
          preIcon="check"
          postIcon="check"
        >
          Info
        </Badge>
      </SandboxExamplesContainer>
    </div>
  );
};
