import * as React from 'react'


interface ComponentDecorator<TOriginalProps, TOuterProps> {
  (component: React.ComponentClass<TOriginalProps> | React.StatelessComponent<TOriginalProps>): React.ComponentClass<TOuterProps>;
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
}

export function getProvider<Store extends SharedStore>(
  name: string,
  StoreClass?: new(storeName: string, initialState?: any) => Store
):  {
  new(): EnhancedComponent<Store>
  connect<TOuterProps, TInnerProps>(mapStoreToProps: MapStateToProps<Store, TOuterProps, TInnerProps>): ComponentDecorator<TInnerProps, TOuterProps>
}

export function connect<Store, TOuterProps, TInnerProps>(
  name: string,
  mapStateToProps?: MapStateToProps<Store, TOuterProps, TInnerProps>,
): ComponentDecorator<TInnerProps, TOuterProps>;
