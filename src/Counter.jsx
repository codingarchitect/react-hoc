import React from 'react';
import PropTypes from 'prop-types';
import applyState from './hoc-wrappers/with-state';

const reducer = (state, action) => {
  switch (action.type) {
    case '@@INIT': return { count: 0 };
    case 'INC': return { count: state.count + 1 };
    case 'DEC': return { count: state.count - 1 };
    default:
      break;
  }
  return state;
};

const Counter = ({ count, actionCreators }) => (<div>
  <button onClick={actionCreators('DEC')}>-</button>
  Counter: {count}
  <button onClick={actionCreators('INC')}>+</button>
</div>);

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  actionCreators: PropTypes.func.isRequired,
};

export default applyState(reducer, Counter);
