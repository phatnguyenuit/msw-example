import { act, renderHook } from '@testing-library/react-hooks';
import useIsMounted from '../useIsMounted';

describe('useIsMounted', () => {
  it('should return true on did mount', () => {
    const { result } = renderHook(useIsMounted);

    expect(result.current()).toEqual(true);
  });

  it('should return false on unmount', () => {
    const { result, unmount } = renderHook(useIsMounted);

    act(() => {
      unmount();
    });

    expect(result.current()).toEqual(false);
  });
});
