import signals from 'signals'

export class SharedStore {
  debug = false
  onStateChange = null

  constructor(storeName, initialState={}) {
    this.onStateChange = new signals.Signal()
    this.storeName = storeName
    this._state = initialState
  }

  setDebug(debug) {
    this.debug = debug
  }

  setState = (partialState) => {
    let newState = {
      ...this._state,
      ...partialState
    }

    if (this.debug) {
      console.group(`SharedState: updated ${this.storeName}`)
      console.log(`Old state  `, this._state)
      console.log(`Changes    `, partialState)
      console.log(`New state  `, newState)
      console.groupEnd()
    }

    this._state = newState
    this.onStateChange.dispatch(this._state, partialState)
  }

  getState = () => {
    return this._state
  }
}
