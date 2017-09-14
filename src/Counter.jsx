import React from 'react';
import PropTypes from 'prop-types';
import { cond, equals, T } from 'ramda';
import applyState from './hoc-wrappers/with-state.jsx';

const reducer = (state, action) => cond([
  [equals('@@INIT'), () => ({ count: action.payload.props.initialCount })],
  [equals('INC'), () => ({ count: state.count + 1 })],
  [equals('DEC'), () => ({ count: state.count - 1 })],
  [T, () => state],
])(action.type);

const Counter = ({ count, localDispatch }) => (<div>
  <button onClick={localDispatch('DEC')}>-</button>
  Counter: {count}
  <button onClick={localDispatch('INC1')}>+</button>
</div>);

Counter.propTypes = {
  initialCount: PropTypes.number, // eslint-disable-line
  count: PropTypes.number.isRequired,
  localDispatch: PropTypes.func.isRequired,
};

Counter.defaultProps = {
  initialCount: 0,
};

export default applyState(reducer)(Counter);
