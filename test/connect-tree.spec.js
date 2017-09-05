import React from 'react'
import { shallow } from 'enzyme';


import {connectTree, getProvider, TreeState} from '../src'
import TestUtils from 'react-dom/test-utils'

describe('connectTree', () => {

  it('Provider should pass context via given name', () => {
    const SimpleProvider = getProvider('provider')

    const wrapper = shallow((
      <SimpleProvider />
    ))
  })

  it('TreeState instance should be passed through props', () => {
    const SimpleProvider = getProvider('provider')
    class Passthrough extends React.Component {
      render() {
        return <div />
      }
    }
    const Container = connectTree('provider')(Passthrough)

    const spy = jest.spyOn(console, 'error')
    const tree = TestUtils.renderIntoDocument(
      <SimpleProvider>
        <Container />
      </SimpleProvider>
    )
    expect(spy).not.toHaveBeenCalled();

    const stub = TestUtils.findRenderedComponentWithType(tree, Passthrough)
    expect(stub.props.provider).toBeInstanceOf(TreeState)
  })

  it('state variables should be mapped via mapStateToProps', () => {
    const SimpleProvider = getProvider('provider')
    class Passthrough extends React.Component {
      render() {
        return <div />
      }
    }
    const Container = connectTree('provider', (state)=>({name: state.name}))(Passthrough)
    const tree = TestUtils.renderIntoDocument(
      <SimpleProvider state={{name: 'John'}}>
        <Container />
      </SimpleProvider>
    )
    const stub = TestUtils.findRenderedComponentWithType(tree, Passthrough)
    expect(stub.props.name).toEqual('John')
  })

  it('state variables passed via mapStateToProps should be changed on state change', () => {
    const SimpleProvider = getProvider('provider')
    class Passthrough extends React.Component {
      render() {
        return <div />
      }
    }
    const Container = connectTree('provider', (state)=>({name: state.name}))(Passthrough)
    const tree = TestUtils.renderIntoDocument(
      <SimpleProvider state={{name: 'John'}}>
        <Container />
      </SimpleProvider>
    )
    const provider = TestUtils.findRenderedComponentWithType(tree, SimpleProvider)
    provider.stateProxy.setState({name: 'Mary'})
    const stub = TestUtils.findRenderedComponentWithType(tree, Passthrough)
    expect(stub.props.name).toEqual('Mary')
  })
})