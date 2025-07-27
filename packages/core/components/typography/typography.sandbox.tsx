import Typography, { TypographyColor, TypographySize } from '$/core/components/typography';
import { TypographyVariant } from '$/core/components/typography/typography';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Typography',
};

export const Sizes = () => {
  return (
    <SandboxExamplesContainer>
      <Typography size={TypographySize.EXTRA_SMALL}>Extra small typography</Typography>
      <Typography size={TypographySize.SMALL}>Small typography</Typography>
      <Typography size={TypographySize.BASE}>Default typography with base size</Typography>
      <Typography size={TypographySize.LARGE}>Large typography</Typography>
      <Typography size={TypographySize.EXTRA_LARGE}>Extra large typography</Typography>
      <Typography size={TypographySize.EXTRA_LARGE2}>Two extra large typography</Typography>
      <Typography size={TypographySize.EXTRA_LARGE3}>Three extra large typography</Typography>
      <Typography size={TypographySize.EXTRA_LARGE4}>Four extra large typography</Typography>
    </SandboxExamplesContainer>
  );
};

export const Color = () => {
  return (
    <SandboxExamplesContainer>
      <Typography size={TypographySize.BASE} color={TypographyColor.NEUTRAL}>
        Neutral typography
      </Typography>
      <Typography size={TypographySize.BASE} color={TypographyColor.BRAND}>
        Brand typography
      </Typography>
      <Typography size={TypographySize.BASE} color={TypographyColor.SUCCESS}>
        Success typography
      </Typography>
      <Typography size={TypographySize.BASE} color={TypographyColor.INFO}>
        Info typography
      </Typography>
      <Typography size={TypographySize.BASE} color={TypographyColor.WARNING}>
        Warning typography
      </Typography>
      <Typography size={TypographySize.BASE} color={TypographyColor.WARNING_HIGH}>
        Warning High typography
      </Typography>
      <Typography size={TypographySize.BASE} color={TypographyColor.DANGER}>
        Danger typography
      </Typography>
    </SandboxExamplesContainer>
  );
};

export const GeistSans = () => {
  return (
    <SandboxExamplesContainer>
      <Typography size={TypographySize.EXTRA_SMALL} class="font-regular">
        Extra small typography
      </Typography>
      <Typography size={TypographySize.SMALL} class="font-regular">
        Small typography
      </Typography>
      <Typography size={TypographySize.BASE} class="font-regular">
        Default typography with base size
      </Typography>
      <Typography size={TypographySize.LARGE} class="font-regular">
        Large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE} class="font-regular">
        Extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE2} class="font-regular">
        Two extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE3} class="font-regular">
        Three extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE4} class="font-regular">
        Four extra large typography
      </Typography>

      <Typography size={TypographySize.EXTRA_SMALL} class="font-medium">
        Extra small typography
      </Typography>
      <Typography size={TypographySize.SMALL} class="font-medium">
        Small typography
      </Typography>
      <Typography size={TypographySize.BASE} class="font-medium">
        Default typography with base size
      </Typography>
      <Typography size={TypographySize.LARGE} class="font-medium">
        Large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE} class="font-medium">
        Extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE2} class="font-medium">
        Two extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE3} class="font-medium">
        Three extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE4} class="font-medium">
        Four extra large typography
      </Typography>

      <Typography size={TypographySize.EXTRA_SMALL} class="font-semibold">
        Extra small typography
      </Typography>
      <Typography size={TypographySize.SMALL} class="font-semibold">
        Small typography
      </Typography>
      <Typography size={TypographySize.BASE} class="font-semibold">
        Default typography with base size
      </Typography>
      <Typography size={TypographySize.LARGE} class="font-semibold">
        Large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE} class="font-semibold">
        Extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE2} class="font-semibold">
        Two extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE3} class="font-semibold">
        Three extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE4} class="font-semibold">
        Four extra large typography
      </Typography>

      <Typography size={TypographySize.EXTRA_SMALL} class="font-bold">
        Extra small typography
      </Typography>
      <Typography size={TypographySize.SMALL} class="font-bold">
        Small typography
      </Typography>
      <Typography size={TypographySize.BASE} class="font-bold">
        Default typography with base size
      </Typography>
      <Typography size={TypographySize.LARGE} class="font-bold">
        Large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE} class="font-bold">
        Extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE2} class="font-bold">
        Two extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE3} class="font-bold">
        Three extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE4} class="font-bold">
        Four extra large typography
      </Typography>
    </SandboxExamplesContainer>
  );
};

export const GeistMono = () => {
  return (
    <SandboxExamplesContainer>
      <Typography size={TypographySize.EXTRA_SMALL} class="font-regular font-family-geist-mono">
        Extra small typography
      </Typography>
      <Typography size={TypographySize.SMALL} class="font-regular font-family-geist-mono">
        Small typography
      </Typography>
      <Typography size={TypographySize.BASE} class="font-regular font-family-geist-mono">
        Default typography with base size
      </Typography>
      <Typography size={TypographySize.LARGE} class="font-regular font-family-geist-mono">
        Large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE} class="font-regular font-family-geist-mono">
        Extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE2} class="font-regular font-family-geist-mono">
        Two extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE3} class="font-regular font-family-geist-mono">
        Three extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE4} class="font-regular font-family-geist-mono">
        Four extra large typography
      </Typography>

      <Typography size={TypographySize.EXTRA_SMALL} class="font-medium font-family-geist-mono">
        Extra small typography
      </Typography>
      <Typography size={TypographySize.SMALL} class="font-medium font-family-geist-mono">
        Small typography
      </Typography>
      <Typography size={TypographySize.BASE} class="font-medium font-family-geist-mono">
        Default typography with base size
      </Typography>
      <Typography size={TypographySize.LARGE} class="font-medium font-family-geist-mono">
        Large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE} class="font-medium font-family-geist-mono">
        Extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE2} class="font-medium font-family-geist-mono">
        Two extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE3} class="font-medium font-family-geist-mono">
        Three extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE4} class="font-medium font-family-geist-mono">
        Four extra large typography
      </Typography>

      <Typography size={TypographySize.EXTRA_SMALL} class="font-semibold font-family-geist-mono">
        Extra small typography
      </Typography>
      <Typography size={TypographySize.SMALL} class="font-semibold font-family-geist-mono">
        Small typography
      </Typography>
      <Typography size={TypographySize.BASE} class="font-semibold font-family-geist-mono">
        Default typography with base size
      </Typography>
      <Typography size={TypographySize.LARGE} class="font-semibold font-family-geist-mono">
        Large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE} class="font-semibold font-family-geist-mono">
        Extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE2} class="font-semibold font-family-geist-mono">
        Two extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE3} class="font-semibold font-family-geist-mono">
        Three extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE4} class="font-semibold font-family-geist-mono">
        Four extra large typography
      </Typography>

      <Typography size={TypographySize.EXTRA_SMALL} class="font-bold font-family-geist-mono">
        Extra small typography
      </Typography>
      <Typography size={TypographySize.SMALL} class="font-bold font-family-geist-mono">
        Small typography
      </Typography>
      <Typography size={TypographySize.BASE} class="font-bold font-family-geist-mono">
        Default typography with base size
      </Typography>
      <Typography size={TypographySize.LARGE} class="font-bold font-family-geist-mono">
        Large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE} class="font-bold font-family-geist-mono">
        Extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE2} class="font-bold font-family-geist-mono">
        Two extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE3} class="font-bold font-family-geist-mono">
        Three extra large typography
      </Typography>
      <Typography size={TypographySize.EXTRA_LARGE4} class="font-bold font-family-geist-mono">
        Four extra large typography
      </Typography>
    </SandboxExamplesContainer>
  );
};

export const PreserveWhitespace = () => {
  const text = `This is content\n\nthat has both\t\texplicit whitespace character

    like \\n or \\t
as well as natural whitespace characters

    in the text itself`;
  return (
    <SandboxExamplesContainer>
      <Typography variant={TypographyVariant.PRESERVE_WHITESPACE}>{text}</Typography>
    </SandboxExamplesContainer>
  );
};
