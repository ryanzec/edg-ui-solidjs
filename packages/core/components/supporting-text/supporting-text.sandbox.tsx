import SupportingText, { SupportingTextColor } from '$/core/components/supporting-text/index';

export default {
  title: 'Components/SupportingText',
};

export const Default = () => {
  return (
    <>
      <SupportingText>Default supporting text</SupportingText>
      <SupportingText color={SupportingTextColor.NEUTRAL}>Neutral supporting text</SupportingText>
      <SupportingText color={SupportingTextColor.DANGER}>Danger supporting text</SupportingText>
    </>
  );
};
