import React from 'react';
import PropTypes from 'prop-types';
import applyState from './hoc-wrappers/with-state.jsx';

const reducer = (state, action) => {
  switch (action.type) {
    case '@@INIT': return { count: action.payload.props.initialCount };
    case 'INC': return { count: state.count + 1 };
    case 'DEC': return { count: state.count - 1 };
    default:
      break;
  }
  return state;
};

const Counter = ({ count, localDispatch }) => (<div>
  <button onClick={localDispatch('DEC')}>-</button>
  Counter: {count}
  <button onClick={localDispatch('INC')}>+</button>
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
