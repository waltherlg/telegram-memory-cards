export const USER_CONSTANTS = {
  USERNAME: {
    LENGTH_MIN: 6,
    LENGTH_MAX: 30,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },

  PASSWORD: {
    LENGTH_MIN: 6,
    LENGTH_MAX: 30,
    PATTERN:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]).+$/,
  },
};
