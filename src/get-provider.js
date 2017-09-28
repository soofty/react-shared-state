/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SharedStore } from './shared-state'
import { connect } from './connect'

export function getProvider(name, ProviderStore = SharedStore) {
  class Provider extends Component {
    sharedStore = null

    constructor(props, context) {
      super(props, context)
      this.sharedStore = new ProviderStore(props.state)
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
      if (typeof this.props.children === 'string') {
        return <span>{this.props.children}</span>
      } else {
        return this.props.children || null
      }
    }
  }

  Provider.childContextTypes = {
    [name]: PropTypes.object
  }

  return Provider
}