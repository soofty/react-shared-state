import signals from 'signals'

export class SharedStore {
  onStateChange = null

  constructor(initialState={}) {
    this.onStateChange = new signals.Signal()
    this._state = initialState
  }

  setState = (partialState) => {
    this._state = {
      ...this._state,
      ...partialState
    }
    this.onStateChange.dispatch(this._state, partialState)
  }

  getState = () => {
    return this._state
  }
}
