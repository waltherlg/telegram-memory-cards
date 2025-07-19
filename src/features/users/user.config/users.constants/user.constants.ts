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

  SLEEP_TIME: {
    START: 21,
    STOP: 9,
  },
};
