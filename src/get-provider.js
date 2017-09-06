/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TreeState } from './tree-state'
import { connectTree } from './connect-tree'

export function getProvider(name, StateProxy = TreeState) {
  class Provider extends Component {
    stateProxy = null
    getState = () => this.state
    shouldComponentUpdate = () => false

    constructor(props, context) {
      super(props, context)
      this.stateProxy = new StateProxy(this)
      this.state = props.state || {}
    }

    static connect(mapStateToProps) {
      return connectTree(name, mapStateToProps)
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