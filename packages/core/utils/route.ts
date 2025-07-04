const isActive = (checkPathName: string, activePathName: string) => {
  return activePathName.startsWith(checkPathName);
};

export const routeUtils = {
  isActive,
};
