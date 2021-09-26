import { RestHandler } from 'msw';

export const isRestHandler = (
  handlerOrHandlerMapping: RestHandler | Record<string, RestHandler>,
): handlerOrHandlerMapping is RestHandler => {
  return (
    handlerOrHandlerMapping.run &&
    typeof handlerOrHandlerMapping.run === 'function'
  );
};
