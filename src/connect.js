import React, { Component } from 'react'
import PropTypes from 'prop-types'


export function connect(name, storeToProps) {
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
        this.store = context[name]
        this.store.onStateChange.add(this.onStateChange)
      }

      render() {
        const props = {
          ...(storeToProps && storeToProps(this.store, this.props)),
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
