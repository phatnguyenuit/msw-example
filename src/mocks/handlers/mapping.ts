import { RestHandlerMapping } from 'typings/rest';

import { login, getUserSuccess, getUserFailed, getUserError } from './user';

export const handlerMapping: RestHandlerMapping = {
  login,
  getUser: {
    success: getUserSuccess,
    failed: getUserFailed,
    error: getUserError,
  },
};
