import { RestHandler } from 'msw';

import { isRestHandler } from 'utils/rest';

import { handlerMapping } from './mapping';

const handlers = Object.keys(handlerMapping).reduce<RestHandler[]>(
  (prev, handlerKey) => {
    const keyHandler = handlerMapping[handlerKey];

    const defaultHandler = isRestHandler(keyHandler)
      ? keyHandler
      : Object.values(keyHandler)[0];

    return prev.concat(defaultHandler);
  },
  [],
);

export default handlers;
