import React from 'react'
import 'raf/polyfill'
import TestUtils from 'react-dom/test-utils'

import { connect, createProvider } from '../src'

describe('connect', () => {
  it('state variables should be mapped via storeToProps', () => {
    const SimpleProvider = createProvider('provider')

    class Passthrough extends React.Component {
      render() {
        return <div />
      }
    }

    const Container = connect('provider', (store) => ({ name: store.state.name }))(Passthrough)
    const app = TestUtils.renderIntoDocument(
      <SimpleProvider initialState={{ name: 'John' }}>
        <Container />
      </SimpleProvider>
    )
    const stub = TestUtils.findRenderedComponentWithType(app, Passthrough)
    expect(stub.props.name).toEqual('John')
  })

  it('nothing must be passed from state if storeToProps is not passed', () => {
    expect(() => connect('anyProvider')(() => <div>Hello</div>)).toThrow('stateToProps is undefined for anyProvider')
  })

  it('state variables passed via storeToProps should be changed on state change', () => {
    const SimpleProvider = createProvider('provider')

    class Passthrough extends React.Component {
      render() {
        return <div />
      }
    }

    const Container = connect('provider', (store) => ({ name: store.state.name }))(Passthrough)
    const app = TestUtils.renderIntoDocument(
      <SimpleProvider state={{ name: 'John' }}>
        <Container />
      </SimpleProvider>
    )
    const provider = TestUtils.findRenderedComponentWithType(app, SimpleProvider)
    provider.sharedStore.setState({ name: 'Mary' })
    const stub = TestUtils.findRenderedComponentWithType(app, Passthrough)
    expect(stub.props.name).toEqual('Mary')
  })
})
