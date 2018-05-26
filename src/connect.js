import React from 'react'
import PropTypes from 'prop-types'


export function connect(name, storeToProps) {
  if (!storeToProps) {
    throw Error(`stateToProps is undefined for ${name}`)
  }
  return (InnerComponent) => {
    class MapHoc extends React.Component {
      mounted = false

      onStateChange = () => {
        if (!this.mounted) return
        let newLocalState = storeToProps(this.store, this.props)
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
        this.store = context[name]
        this.store.onStateChange.add(this.onStateChange)

        this.state = storeToProps(this.store, props)

      }

      componentDidMount() {
        this.mounted = true
      }

      componentWillUnmount() {
        this.mounted = false
      }


      render() {
        return (
          <InnerComponent
            {...this.props}
            {...this.state}
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
