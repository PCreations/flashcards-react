import React, { useReducer, useMemo } from 'react';
import { render, act } from 'react-testing-library';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'set':
      return { count: action.count };
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Test({ count }) {
  console.log('rendering with count', count, Math.random());
  return <div>{`some count ${count}`}</div>;
}

function Counter({ pushUpdate, setDispatch }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  pushUpdate(state);
  setDispatch(dispatch);
  const { count } = state;
  return useMemo(() => {
    return (
      <div>
        Count: {count}
        <Test count={count} />
      </div>
    );
  }, [count]);
}

test('renders', () => {
  const updates = [];
  let dispatch;
  render(<Counter pushUpdate={state => updates.push(state)} setDispatch={d => (dispatch = d)} />);
  act(() => dispatch({ type: 'set', count: 2 }));
  act(() => dispatch({ type: 'set', count: 2 }));
  expect(updates.length).toBe(2);
  expect(updates[0]).toEqual({ count: 2 });
});
