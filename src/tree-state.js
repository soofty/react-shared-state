import signals from 'signals'

export class TreeState {
  providerComponent = undefined
  onStateChange = null

  constructor(providerComponent) {
    this.providerComponent = providerComponent
    this.onStateChange = new signals.Signal()
  }

  setState = (partialState) => {
    return this.providerComponent.setState(
      partialState,
      () => {
        this.onStateChange.dispatch(this.providerComponent.state, partialState)
      })
  }

  getState = () => {
    return this.providerComponent.state
  }
}