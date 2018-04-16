import * as React from 'react'

type ComponentClass<P> = React.ComponentClass<P>;
type StatelessComponent<P> = React.StatelessComponent<P>;


interface ComponentDecorator<TOriginalProps, TOuterProps> {
  (component: ComponentClass<TOriginalProps> | StatelessComponent<TOriginalProps>): ComponentClass<TOuterProps>;
}

interface MapStateToProps<Store, TOuterProps, TMappedProps> {
  (state: Store, ownProps?: TOuterProps): TMappedProps;
}


export class SharedStore<State = {}> {
  state: State

  constructor(storeName: string, initialState?: any)
  public setState(partialState: Partial<State>): void
  public getState(): State
  public stateDidSet(oldState: State, newState: State): void
}

export class EnhancedComponent<Store extends SharedStore, P = any, S = any> extends React.Component<P, S> {
  sharedStore: Store
  static connect(): void
}

export function getProvider<Store extends SharedStore>(
  name: string,
  StoreClass?: new(storeName: string, initialState?: any) => Store
):  new() => EnhancedComponent<Store>

export function connect<Store, TOuterProps, TMappedProps>(
  name: string,
  mapStateToProps?: MapStateToProps<Store, TOuterProps, TMappedProps>,
): ComponentDecorator<Store, TOuterProps>;
