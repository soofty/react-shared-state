import React from 'react'
import PropTypes from 'prop-types'


export function connect(name, stateToProps) {
  if (!stateToProps) {
    throw Error(`stateToProps is undefined for ${name}`)
  }
  return (InnerComponent) => {
    class MapHoc extends React.Component {
      mounted = false
      onStateChange = (newState) => {
        if (!this.mounted) return
        let newLocalState = stateToProps(newState, this.props)
        for (let key of Object.keys(newLocalState)) {
          if (newLocalState[key] !== this.state[key]) {
            this.setState(newLocalState)
            break
          }
        }
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

        this.state = stateToProps ? stateToProps(this.stateProxy.getState(), props) : {}
        this.stateProxy.onStateChange.add(this.onStateChange)
      }

      componentDidMount() {
        this.mounted = true
      }

      componentWillUnmount() {
        this.mounted = false
      }


      render() {
        const props = {
          ...this.state,
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