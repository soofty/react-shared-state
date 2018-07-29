import React from 'react'

import { createProvider, ProviderComponent } from '../src'
import TestUtils from 'react-dom/test-utils'

describe('createProvider', () => {
  beforeEach(() => {
    ProviderComponent.DEBUG = false
  })

  it('should render provider with blank state', () => {
    const SimpleProvider = createProvider('provider')
    const provider = TestUtils.renderIntoDocument(<SimpleProvider />)
    const stub = TestUtils.findRenderedComponentWithType(provider, SimpleProvider)
    expect(stub.sharedStore.state).toEqual({})
  })

  it('should render provider provided state', () => {
    const SimpleProvider = createProvider('provider')
    let state = {'name': 'John'}
    const provider = TestUtils.renderIntoDocument(<SimpleProvider initialState={{ 'name': 'John' }} />)
    const stub = TestUtils.findRenderedComponentWithType(provider, SimpleProvider)
    expect(stub.sharedStore.state).toEqual(state)
  })

  it('should set DEBUG globally', () => {
    ProviderComponent.DEBUG = true
    const SimpleProvider = createProvider('provider')
    const provider = TestUtils.renderIntoDocument(<SimpleProvider initialState={{ 'name': 'John' }} />)
    const stub = TestUtils.findRenderedComponentWithType(provider, SimpleProvider)
    expect(SimpleProvider.DEBUG).toEqual(true)
    expect(stub.sharedStore.debug).toEqual(true)
  })

  it('should set debug locally', () => {
    const SimpleProvider = createProvider('provider')
    const provider = TestUtils.renderIntoDocument(<SimpleProvider initialState={{ 'name': 'John' }}  debug={true} />)
    const stub = TestUtils.findRenderedComponentWithType(provider, SimpleProvider)
    expect(SimpleProvider.DEBUG).toEqual(false)
    expect(stub.sharedStore.debug).toEqual(true)
  })
})
