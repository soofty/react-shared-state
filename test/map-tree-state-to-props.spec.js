import React from 'react'
import { shallow } from 'enzyme';


import {mapTreeStateToProps, getProvider, TreeState} from '../src'
import TestUtils from 'react-dom/test-utils'

describe('mapTreeStateToProps', () => {

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
    const Container = mapTreeStateToProps('provider')(Passthrough)

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

  it('TreeState instance should be passed through props', () => {
    const SimpleProvider = getProvider('provider')
    class Passthrough extends React.Component {
      render() {
        return <div />
      }
    }
    const Container = mapTreeStateToProps('provider')(Passthrough)

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
})