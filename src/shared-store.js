import signals from 'signals'

export class SharedStore {
  debug = false
  onStateChange = null

  constructor(storeId, initialState={}) {
    this.onStateChange = new signals.Signal()
    this.storeId = storeId
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
      console.group(`SharedState: updated ${this.storeId}`)
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
