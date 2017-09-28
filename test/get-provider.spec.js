import React from 'react'

import { getProvider, ProviderComponent } from '../src'
import TestUtils from 'react-dom/test-utils'

describe('getProvider', () => {
  beforeEach(() => {
    ProviderComponent.DEBUG = false
  });

  it('should render provider with blank state', () => {
    const SimpleProvider = getProvider('provider')
    const provider = TestUtils.renderIntoDocument(<SimpleProvider />)
    const stub = TestUtils.findRenderedComponentWithType(provider, SimpleProvider)
    expect(stub.sharedStore._state).toEqual({})
  })

  it('should render provider provided state', () => {
    const SimpleProvider = getProvider('provider')
    let state = {'name': 'John'}
    const provider = TestUtils.renderIntoDocument(<SimpleProvider initialState={{ 'name': 'John' }} />)
    const stub = TestUtils.findRenderedComponentWithType(provider, SimpleProvider)
    expect(stub.sharedStore._state).toEqual(state)
  })

  it('should set DEBUG globally', () => {
    ProviderComponent.DEBUG = true
    const SimpleProvider = getProvider('provider')
    const provider = TestUtils.renderIntoDocument(<SimpleProvider initialState={{ 'name': 'John' }} />)
    const stub = TestUtils.findRenderedComponentWithType(provider, SimpleProvider)
    expect(SimpleProvider.DEBUG).toEqual(true)
    expect(stub.sharedStore.debug).toEqual(true)
  })

  it('should set debug locally', () => {
    const SimpleProvider = getProvider('provider')
    const provider = TestUtils.renderIntoDocument(<SimpleProvider initialState={{ 'name': 'John' }}  debug={true} />)
    const stub = TestUtils.findRenderedComponentWithType(provider, SimpleProvider)
    expect(SimpleProvider.DEBUG).toEqual(false)
    expect(stub.sharedStore.debug).toEqual(true)
  })
})