import React, { Component } from 'react'
import PropTypes from 'prop-types'


export function connect(name, stateToProps) {
  return (InnerComponent) => {
    class MapHoc extends Component {
      onStateChange = (newState) => {
        this.setState(newState)
      }

      constructor(props, context) {
        super()
        if (!context[name]) {
          /* eslint-disable no-console */
          console.error(`SharedState provider was not found at context.${name}`)
          /* eslint-enable no-console */
          return
        }
        this.stateProxy = context[name]

        this.state = this.stateProxy.getState()
        this.stateProxy.onStateChange.add(this.onStateChange)
      }

      render() {
        const props = {
          ...(stateToProps && stateToProps(this.state, this.props)),
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