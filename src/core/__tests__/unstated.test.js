import React, { useReducer, useMemo } from 'react';
import { createContainer } from 'unstated-next';
import { render, act } from 'react-testing-library';
import { Record } from 'immutable';

const State = Record({ count: 0 });

function reducer(state = State(), action) {
  switch (action.type) {
    case 'set':
      return state.set('count', action.count);
    case 'increment':
      return state.update('count', c => c + 1);
    case 'decrement':
      return state.update('count', c => c - 1);
    default:
      throw new Error();
  }
}

const useCounter = (initialState = State()) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

const Counter = createContainer(useCounter);

function CounterDisplay({ setDispatch }) {
  const { state, dispatch } = Counter.useContainer();
  setDispatch(dispatch);
  return useMemo(() => {
    console.log('count', state.count, Math.random());
    return <div data-testid="count">{state.count}</div>;
  }, [state]);
}

test('unstated', () => {
  let dispatch;
  const { getByTestId } = render(
    <Counter.Provider>
      <CounterDisplay setDispatch={d => (dispatch = d)} />
    </Counter.Provider>,
  );
  act(() => dispatch({ type: 'set', count: 2 }));
  expect(getByTestId('count').textContent).toBe('2');
});
