import * as React from 'react'

type ComponentClass<P> = React.ComponentClass<P>;
type StatelessComponent<P> = React.StatelessComponent<P>;


interface ComponentDecorator<TOriginalProps, TOuterProps> {
  (component: ComponentClass<TOriginalProps> | StatelessComponent<TOriginalProps>): ComponentClass<TOuterProps>;
}

interface MapStateToProps<TPropsFromState, TOuterProps> {
  (state: any, ownProps?: TOuterProps): TPropsFromState;
}


export class SharedState {
  public setState(newState: object): void
}

export class EnhancedComponent<ProxyProps = any, P = any, S = any> extends React.Component<P, S> {
  stateProxy: ProxyProps

  static connect(): void

}

export function getProvider<S, ProxyProps>(name: string, StateProxy?: new() => ProxyProps):  new() => EnhancedComponent<ProxyProps, any, S>

export function connect<ProxyProps, TPropsFromState, TOuterProps>(
  name: string,
  mapStateToProps?: MapStateToProps<TPropsFromState, TOuterProps>,
): ComponentDecorator<TPropsFromState & ProxyProps, TOuterProps>;
