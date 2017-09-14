import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Counter from './Counter.jsx';

const App = ({ dispatch }) => (
  <div>
    <h1>Hello from react!</h1>
    <button onClick={() => dispatch({ type: 'PING' })}>Dispatch Ping</button>
    <div>Check the console to see if ping was mapped to pong by cycle on Dispatch Ping</div>
    <Counter initialCount={100} />
  </div>
);

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
