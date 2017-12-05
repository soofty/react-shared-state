import * as React from 'react'

type ComponentClass<P> = React.ComponentClass<P>;
type StatelessComponent<P> = React.StatelessComponent<P>;


interface ComponentDecorator<TOriginalProps, TOuterProps> {
  (component: ComponentClass<TOriginalProps> | StatelessComponent<TOriginalProps>): ComponentClass<TOuterProps>;
}

interface MapStateToProps<TPropsFromState, TOuterProps> {
  (state: any, ownProps?: TOuterProps): TPropsFromState;
}


export class SharedStore<State = {}> {
  state: State

  constructor(storeName: string, initialState?: any)
  public setState(newState: Partial<State>): void
  public getState(): State
}

export class EnhancedComponent<StoreProps = any, P = any, S = any> extends React.Component<P, S> {
  sharedStore: StoreProps

  static connect(): void
}

export function getProvider<S, StoreProps>(name: string, StateProxy?: new() => StoreProps):  new() => EnhancedComponent<StoreProps, any, S>

export function connect<StoreProps, TPropsFromState, TOuterProps>(
  name: string,
  mapStateToProps?: MapStateToProps<TPropsFromState, TOuterProps>,
): ComponentDecorator<TPropsFromState & StoreProps, TOuterProps>;
