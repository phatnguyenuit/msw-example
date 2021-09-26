import { RestHandler } from 'msw';

export type RestHandlerMapping = Record<
  string,
  RestHandler | Record<string, RestHandler>
>;
