
export const windowExists = typeof window !== 'undefined' ? window : {
  sr:'',
  __PRELOADED_STATE__: {},
  addEventListener: () => { },
  location: { hostname: '', origin: '', href: '', reload: () => { } },
  localStorage: { setItem: (key, value) => { }, getItem: (key) => JSON.stringify({ token: '' }) },
};

export const documentExists = typeof document !== 'undefined' ? document : { getElementById: () => { } };
