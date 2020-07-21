export const windowExists =
  typeof window !== 'undefined'
    ? window
    : {
        sr: '',
        __PRELOADED_STATE__: {},
        addEventListener: () => ({}),
        location: {
          hostname: '',
          origin: '',
          href: '',
          reload: () => ({}),
        },
        localStorage: {
          setItem: (key: string, value: string) => ({ key, value }),
          getItem: (key: string) => JSON.stringify({ token: '', key }),
        },
      };

export const documentExists = typeof document !== 'undefined' ? document : { getElementById: () => ({}) };
