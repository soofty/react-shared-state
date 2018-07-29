/* eslint react/prop-types: 0 */
import React from 'react'
import PropTypes from 'prop-types'

import { SharedStore } from './shared-store'
import { connect } from './connect'

export class ProviderComponent extends React.Component {
  static DEBUG = false // we can set it globally
}


export function createProvider(name, StoreClass = SharedStore) {
  class Provider extends ProviderComponent {
    sharedStore = null

    constructor(props, context) {
      super(props, context)
      this.sharedStore = new StoreClass(name, props.initialState)
      this.sharedStore.setDebug(props.debug || ProviderComponent.DEBUG)
    }

    static connect(mapStateToProps) {
      return connect(name, mapStateToProps)
    }

    getChildContext() {
      return {
        [name]: this.sharedStore
      }
    }

    render() {
      if (!this.props.children) {
        return null
      }
      return <span>{this.props.children}</span>
    }
  }

  Provider.childContextTypes = {
    [name]: PropTypes.object
  }
  return Provider
}


export function getProvider(name, StoreClass = SharedStore) {
  console.warn('getProvider is deprecated. Please use createProvider instead')
  return createProvider(name, StoreClass)
}
