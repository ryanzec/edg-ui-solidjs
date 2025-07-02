import type { Draft } from 'immer';

// immer does not like using tools like lodash for this so we need be manual
// biome-ignore lint/suspicious/noExplicitAny: this is a generic method so we need to allow any
const set = (draft: Draft<any>, path: string, value: any) => {
  const pathParts = path.split('.');

  // biome-ignore lint/suspicious/noExplicitAny: this is a generic method so we need to allow any
  let current: any = draft;

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];

    if (!current[part]) {
      current[part] = {};
    }

    current = current[part];
  }

  current.errors = value;
};

// immer does not like using tools like lodash for this so we need be manual
// biome-ignore lint/suspicious/noExplicitAny: this is a generic method so we need to allow any
const unset = (draft: Draft<any>, path: string) => {
  const pathParts = path.split('.').concat(['errors']);

  // single level property
  if (pathParts.length === 1) {
    delete draft[pathParts[0] as keyof typeof draft];

    return;
  }

  // biome-ignore lint/suspicious/noExplicitAny: this is a generic method so we need to allow any
  let current: any = draft;

  // nested property
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];

    if (current[part] === undefined) {
      return;
    }

    current = current[part];

    if (typeof current !== 'object' || current === null) {
      return;
    }
  }

  const lastPart = pathParts[pathParts.length - 1];

  delete current[lastPart];
};

export const immerUtils = {
  set,
  unset,
};
