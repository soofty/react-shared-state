/* eslint react/prop-types: 0 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { SharedStore } from './shared-store'
import { connect } from './connect'

export class ProviderComponent extends Component {
  static DEBUG = false // we can set it globally
}


export function getProvider(name, ProviderStore = SharedStore) {
  class Provider extends ProviderComponent {
    sharedStore = null

    constructor(props, context) {
      super(props, context)
      this.sharedStore = new ProviderStore(name, props.initialState)
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