/* eslint no-return-assign: 0 */
/* eslint fp/no-class: 0 */
/* eslint fp/no-this: 0 */
/* eslint fp/no-nil: 0 */
/* eslint fp/no-mutation: 0 */
/* eslint fp/no-unused-expression: 0 */
/* eslint better/no-ifs: 0 */
/* eslint better/explicit-return: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import { defaultTo } from 'ramda';
/**
 * applyState is a higher order component that takes
 * a local reducer and returns a
 * higher order function that takes the stateless component to add state to.
 * @export
 * @param {any} reducer - a local reducer
 * @returns a higher order function that takes the component to add state to
 */
export default function withState(reducer) {
  return function stateComponentFactory(ComponentToAddState) {
    class ComponentWithState extends React.Component {
      componentWillMount() {
        this.localDispatch('@@INIT')();
      }
      cache = {};
      localDispatch = type => this.cache[type] || (this.cache[type] = (additionalPayload) => {
        if (typeof reducer === 'function') {
          this.setState(reducer(defaultTo({}, this.state), {
            type,
            payload: { additionalPayload, props: this.props },
          }));
        }
      });
      render() {
        return (<ComponentToAddState
          {...this.props}
          {...this.state}
          localDispatch={this.localDispatch}
        />);
      }
    }
    return ComponentWithState;
  };
}
