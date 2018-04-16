import React from 'react'
import TestUtils from 'react-dom/test-utils'

import { connect, getProvider } from '../src'

describe('connect', () => {
  it('state variables should be mapped via mapStateToProps', () => {
    const SimpleProvider = getProvider('provider')
    class Passthrough extends React.Component {
      render() {
        return <div />
      }
    }
    const Container = connect('provider', (store)=>({name: store.state.name}))(Passthrough)
    const app = TestUtils.renderIntoDocument(
      <SimpleProvider initialState={{name: 'John'}}>
        <Container />
      </SimpleProvider>
    )
    const stub = TestUtils.findRenderedComponentWithType(app, Passthrough)
    expect(stub.props.name).toEqual('John')
  })

  it('nothing must be passed from state if mapStateToProps is not passed', () => {
    const SimpleProvider = getProvider('provider')
    class Passthrough extends React.Component {
      render() {
        return <div />
      }
    }
    const Container = connect('provider')(Passthrough)
    const app = TestUtils.renderIntoDocument(
      <SimpleProvider state={{name: 'John'}}>
        <Container />
      </SimpleProvider>
    )
    const stub = TestUtils.findRenderedComponentWithType(app, Passthrough)
    expect(stub.props.name).toBeUndefined()
  })

  it('state variables passed via mapStateToProps should be changed on state change', () => {
    const SimpleProvider = getProvider('provider')
    class Passthrough extends React.Component {
      render() {
        return <div />
      }
    }
    const Container = connect('provider', (store)=>({name: store.state.name}))(Passthrough)
    const app = TestUtils.renderIntoDocument(
      <SimpleProvider state={{name: 'John'}}>
        <Container />
      </SimpleProvider>
    )
    const provider = TestUtils.findRenderedComponentWithType(app, SimpleProvider)
    provider.sharedStore.setState({name: 'Mary'})
    const stub = TestUtils.findRenderedComponentWithType(app, Passthrough)
    expect(stub.props.name).toEqual('Mary')
  })
})
