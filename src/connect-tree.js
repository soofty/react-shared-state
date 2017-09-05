import React, { Component } from 'react'
import PropTypes from 'prop-types'


export function connectTree(name, stateToProps) {
  return (InnerComponent) => {
    class MapHoc extends Component {
      onStateChange = (newState) => {
        this.setState(newState)
      }

      constructor(props, context) {
        super()
        if (!context[name]) {
          /* eslint-disable no-console */
          console.error(`TreeState provider was not found at context.${name}`)
          /* eslint-enable no-console */
          return
        }
        this.stateProxy = context[name]

        this.state = this.stateProxy.getState() || {}
        this.stateProxy.onStateChange.add(this.onStateChange)
      }

      render() {
        const props = {
          ...(stateToProps ? stateToProps(this.state, this.props) : this.state),
          [name]: this.stateProxy
        }
        return (
          <InnerComponent
            {...this.props}
            {...props}
          />
        )
      }
    }

    MapHoc.contextTypes = {
      [name]: PropTypes.any
    }

    return MapHoc
  }
}