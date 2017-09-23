import signals from 'signals'

export class TreeState {
  onStateChange = null

  constructor(initialState={}) {
    this.onStateChange = new signals.Signal()
    this.state = initialState
  }

  setState = (partialState) => {
    this.state = {
      ...this.state,
      ...partialState
    }
    this.onStateChange.dispatch(this.state, partialState)
  }

  getState = () => {
    return this.state
  }
}
