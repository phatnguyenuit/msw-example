import { RestHandler } from 'msw';
import { useState, useCallback, useMemo } from 'react';

import { mswWorker } from 'mocks/browser';
import { handlerMapping } from 'mocks/handlers/mapping';
import { isRestHandler } from 'utils/rest';
import MockSelect from 'components/mock-select';
import { RestHandlerMapping } from 'typings/rest';

const convertHandlerMapping = (
  handleMapping: RestHandlerMapping,
): Record<string, Record<string, RestHandler>> => {
  return Object.entries(handlerMapping).reduce<
    Record<string, Record<string, RestHandler>>
  >((prev, [handlerKey, handlerOrHandlerMapping]) => {
    if (isRestHandler(handlerOrHandlerMapping)) {
      return {
        ...prev,
        [handlerKey]: {
          [handlerKey]: handlerOrHandlerMapping,
        },
      };
    }

    return {
      ...prev,
      [handlerKey]: handlerOrHandlerMapping,
    };
  }, {});
};

const getInitialState = (
  handlers: Record<string, Record<string, RestHandler>>,
): Record<string, string> => {
  return Object.keys(handlers).reduce((prev, handlerKey) => {
    const handlerMappingKeys = Object.keys(handlers[handlerKey]);

    return {
      ...prev,
      [handlerKey]: handlerMappingKeys[0],
    };
  }, {});
};

const MockGUI: React.FC = () => {
  const handlers = useMemo(() => convertHandlerMapping(handlerMapping), []);
  const [state, setState] = useState(getInitialState(handlers));

  const handleSelectMockHandler = useCallback(
    (mockName: string, handlerKey: string) => () => {
      setState((prev) => ({
        ...prev,
        [mockName]: handlerKey,
      }));
      mswWorker.use(handlers[mockName][handlerKey]);
    },
    [handlers],
  );

  const handleResetMock = useCallback(() => {
    setState(getInitialState(handlers));
    mswWorker.resetHandlers();
  }, [handlers]);

  return (
    <div>
      <h2>MockGUI</h2>
      {Object.entries(handlers).map(([handlerKey, handlersMapping]) => {
        return (
          <MockSelect
            key={handlerKey}
            name={handlerKey}
            handlers={handlersMapping}
            value={state[handlerKey]}
            onSelect={handleSelectMockHandler}
          />
        );
      })}
      <button onClick={handleResetMock}>Reset</button>
    </div>
  );
};

export default MockGUI;
