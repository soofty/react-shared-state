/* eslint react/prop-types: 0 */
import React from 'react'
import PropTypes from 'prop-types'

import { SharedStore } from './shared-store'
import { connect } from './connect'

export class ProviderComponent extends React.Component {
  static DEBUG = false // we can set it globally
}


export function createProvider(StoreClass=SharedStore, storeId) {
  //storeId, StoreClass = SharedStore
  if (typeof StoreClass === 'string') {
    throw new Error(
      'createProvider signature createProvider(name, StoreClass) is deprecated.' +
      'Please use createProvider([StoreClass], [storeId]). Also name is not required anymore.' +
      `You've called it with ${StoreClass} as first argument`
    )
  }

  if (storeId === undefined) {
    storeId = StoreClass.name
  }

  class Provider extends ProviderComponent {
    sharedStore = null

    constructor(props, context) {
      super(props, context)
      this.sharedStore = new StoreClass(storeId, props.initialState)
      this.sharedStore.setDebug(props.debug || ProviderComponent.DEBUG)
    }

    static connect(mapStateToProps) {
      return connect(storeId, mapStateToProps)
    }

    getChildContext() {
      return {
        [storeId]: this.sharedStore
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
    [storeId]: PropTypes.object
  }
  return Provider
}
