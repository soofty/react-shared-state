/* eslint react/prop-types: 0 */
import React from 'react'
import PropTypes from 'prop-types'

import { SharedStore } from './shared-store'
import { ComponentDecorator, connect, StoreToPropF } from './connect'

export class ProviderComponent extends React.Component {
  static DEBUG = false // we can set it globally

  static connect(mapStateToProps: StoreToPropF<any>): (InnerComponent: React.ElementType) => ComponentDecorator<any, any> {
    throw "Not Implemented"
  }
}

// @ts-ignore
export function createProvider(StoreClass: typeof SharedStore = SharedStore, storeId: string) {
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
    sharedStore: SharedStore

    constructor(props: any, context: any) {
      super(props, context)
      this.sharedStore = new StoreClass(storeId, props.initialState)
      this.sharedStore.setDebug(props.debug || ProviderComponent.DEBUG)
    }

    static connect(mapStateToProps: StoreToPropF<any>) {
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
      return <>{this.props.children}</>
    }
  }

  (Provider as any).childContextTypes = {
    [storeId]: PropTypes.object
  }
  return Provider as any
}
