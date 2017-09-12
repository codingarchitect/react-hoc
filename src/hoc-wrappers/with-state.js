/* eslint no-return-assign: 1 */
/* eslint fp/no-this: 1 */
/* eslint fp/no-unused-expression: 1 */
/* eslint fp/no-nil: 1 */
/* eslint fp/no-mutation: 1 */
/* eslint better/no-new: 1 */
/* eslint better/explicit-return: 1 */
import { Component } from 'react';

const applyState = (reducer, StatelessComponent) => {
  function WithState() {
    Component.call(this);
    const cache = {};
    const actionCreators = type => cache[type] || (cache[type] = (additionalPayload) => {
      this.setState(reducer(this.state, {
        type,
        payload: { additionalPayload, props: this.props },
      }));
    });
    this.render = () => StatelessComponent({ ...this.props, ...this.state, actionCreators });
    this.componentWillReceiveProps = actionCreators('@@PROPS_CHANGED');
    this.componentWillMount = actionCreators('@@INIT');
  }
  return (WithState.prototype = new Component()).constructor = WithState;
};

export default applyState;
