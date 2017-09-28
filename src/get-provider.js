/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SharedState } from './shared-state'
import { connect } from './connect'

export function getProvider(name, StateProxy = SharedState) {
  class Provider extends Component {
    stateProxy = null

    constructor(props, context) {
      super(props, context)
      this.stateProxy = new StateProxy(props.state)
    }

    static connect(mapStateToProps) {
      return connect(name, mapStateToProps)
    }

    getChildContext() {
      return {
        [name]: this.stateProxy
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