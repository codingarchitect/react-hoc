import React from 'react';
import { cond, equals, T } from 'ramda';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import withState from './with-state.jsx';

describe('WithState Component', () => {
  function TestStatelessComponent() {
    return <div>Stateless component</div>;
  }

  it('withState should render actual component for a stateless component', () => {
    const ComponentWithState = withState()(TestStatelessComponent);
    const tree = renderer.create(<ComponentWithState />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('withState should dispatch @@INIT action', () => {
    const mockReducer = jest.fn().mockImplementation((state = {}, action) => state);
    const ComponentWithState = withState(mockReducer)(TestStatelessComponent);
    renderer.create(<ComponentWithState />);
    expect(mockReducer.mock.calls.length).toBe(1);
  });
  it('withState should dispatch @@INIT action with initial props', () => {
    const mockReducer = jest.fn().mockImplementation((state = {}, action) => state);
    const ComponentWithState = withState(mockReducer)(TestStatelessComponent);
    renderer.create(<ComponentWithState initialProp1="prop1" />);
    expect(mockReducer.mock.calls[0][1]).toEqual({
      type: '@@INIT',
      payload: { additionalPayload: undefined, props: { initialProp1: "prop1" } },
    });
  });
  it('withState should be able to dispatch custom action', () => {
    const mockReducer = jest.fn().mockImplementation((state, action) => cond([
      [equals('@@INIT'), () => ({ count: action.payload.props.initialCount })],
      [equals('INC'), () => ({ count: state.count + 1 })],
      [equals('DEC'), () => ({ count: state.count - 1 })],
      [T, () => state],
    ])(action.type));
    
    const Counter = ({ count, localDispatch }) => (<div>
      <button id="decrementCounter" onClick={localDispatch('DEC')}>-</button>
      Counter: {count}
      <button id="incrementCounter" onClick={localDispatch('INC')}>+</button>
    </div>);
    const ComponentWithState = withState(mockReducer)(Counter);
    const wrapper = mount(<ComponentWithState initialCount={100} />);
    wrapper.find('#incrementCounter').simulate('click');
    const action = mockReducer.mock.calls[1][1];
    const state = mockReducer.mock.calls[1][0];
    expect(state.count).toBe(100);
    expect(action.type).toBe('INC');
  });
});
