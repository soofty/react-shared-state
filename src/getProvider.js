/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TreeState from './TreeState'

export default function getProvider(name, StateProxy = TreeState) {
  class Provider extends Component {
    state = {}

    getState = () => this.state
    shouldComponentUpdate = () => false

    getChildContext() {
      return {
        [name]: new StateProxy(this)
      }
    }

    render() {
      if (typeof this.props.children === 'string') {
        return <span>{this.props.children}</span>
      } else {
        return this.props.children
      }
    }
  }

  Provider.childContextTypes = {
    [name]: PropTypes.object
  }

  return Provider
}