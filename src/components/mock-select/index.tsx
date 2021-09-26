import { RestHandler } from 'msw';

interface MockSelectProps {
  name: string;
  value: string;
  handlers: Record<string, RestHandler>;
  onSelect: (mockName: string, handlerKey: string) => VoidFunction;
}

const MockSelect: React.FC<MockSelectProps> = ({
  name,
  value,
  handlers,
  onSelect,
}) => {
  return (
    <div>
      <h2>{name}</h2>
      {Object.entries(handlers).map(([handlerKey, handler], index) => {
        return (
          <div key={handlerKey}>
            <input
              type="radio"
              id={handlerKey}
              value={handlerKey}
              checked={value === handlerKey}
              name={name}
              onChange={onSelect(name, handlerKey)}
            />
            <label htmlFor={handlerKey}>{handlerKey}</label>
          </div>
        );
      })}
    </div>
  );
};

export default MockSelect;
