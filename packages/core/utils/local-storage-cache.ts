export type LocalStorageCacheData = {
  // biome-ignore lint/suspicious/noExplicitAny: any is being used as we do want to be able to store any kind of data here
  value: any;
  expires: number | boolean;
};

const get = <T = unknown>(key: string | undefined): T | undefined => {
  if (!key) {
    return;
  }

  const now = new Date().getTime();
  const rawData = localStorage.getItem(key);

  if (!rawData) {
    return;
  }

  // @todo(feature) handle when data is not valid json
  const storedData = JSON.parse(rawData);

  let returnData: T | undefined;

  if (storedData?.expires && storedData.expires <= now) {
    //clean up expired data
    localStorage.removeItem(key);
  } else if (storedData) {
    returnData = storedData.value;
  }

  return returnData;
};

const set = <T = unknown>(key: string | undefined, value: T, expireIn = 0) => {
  if (!key) {
    return;
  }

  const expires = new Date().getTime();

  const data: LocalStorageCacheData = {
    value: value,
    expires: expireIn > 0 ? expires + expireIn : false,
  };

  return localStorage.setItem(key, JSON.stringify(data));
};

const remove = (key: string | undefined) => {
  if (!key) {
    return;
  }

  localStorage.removeItem(key);
};

const clear = () => {
  localStorage.clear();
};

export const localStorageCacheUtils = {
  get,
  set,
  remove,
  clear,
};
