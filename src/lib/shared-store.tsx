import signals, { Signal } from 'signals'

export type Dict<T = any> = Record<any, T>

export class SharedStore<State extends Dict = Dict> {
  storeId: string
  state: State
  debug = false
  onStateChange: Signal

  constructor(storeId: string, initialState: State = {} as Dict) {
    this.onStateChange = new signals.Signal()
    this.storeId = storeId
    this.state = initialState
  }

  setDebug(debug: boolean) {
    this.debug = debug
  }

  setState(partialState: Partial<State>) {
    const newState: State = {
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

  // tslint:disable-next-line
  stateDidSet(oldState: State, newState: State): void {}

  getState(): State {
    return this.state
  }
}
