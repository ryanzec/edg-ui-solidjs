export type LaunchDarklyContext = {
  kind: 'multi';
  user: {
    key: string;
    emailDomain: string;
  };
  organization: {
    key: string;
  };
};
