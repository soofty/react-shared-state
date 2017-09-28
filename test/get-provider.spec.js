import React from 'react'

import { getProvider } from '../src'
import TestUtils from 'react-dom/test-utils'

describe('getProvider', () => {
  it('should render provider with blank state', () => {
    const SimpleProvider = getProvider('provider')
    const provider = TestUtils.renderIntoDocument(<SimpleProvider />)
    const stub = TestUtils.findRenderedComponentWithType(provider, SimpleProvider)
    expect(stub.sharedStore._state).toEqual({})
  })

  it('should render provider provided state', () => {
    const SimpleProvider = getProvider('provider')
    let state = {'name': 'John'}
    const provider = TestUtils.renderIntoDocument(<SimpleProvider state={{ 'name': 'John' }} />)
    const stub = TestUtils.findRenderedComponentWithType(provider, SimpleProvider)
    expect(stub.sharedStore._state).toEqual(state)
  })
})