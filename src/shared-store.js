import signals from 'signals'

export class SharedStore {
  debug = false
  onStateChange = null

  constructor(storeName, initialState={}) {
    this.onStateChange = new signals.Signal()
    this.storeName = storeName
    this.state = initialState
  }

  setDebug(debug) {
    this.debug = debug
  }

  setState(partialState) {
    let newState = {
      ...this.state,
      ...partialState
    }

    if (this.debug) {
      console.group(`SharedState: updated ${this.storeName}`)
      console.log(`Old state  `, this.state)
      console.log(`Changes    `, partialState)
      console.log(`New state  `, newState)
      console.groupEnd()
    }

    const oldState = this.state
    this.state = newState
    this.onStateChange.dispatch(this.state, partialState)

    this.stateDidSet(oldState, newState)
  }

  // eslint-disable-next-line
  stateDidSet(oldState, newState) {}

  getState() {
    return this.state
  }
}
