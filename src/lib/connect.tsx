import React from 'react'
import PropTypes from 'prop-types'

import { Dict, SharedStore } from './shared-store'


export type StoreToPropF<State> = (store: SharedStore, props: any) => State

export interface ComponentDecorator<TOriginalProps, TOuterProps> {
  (component: React.ComponentClass<TOriginalProps> | React.FunctionComponent<TOriginalProps>): React.ComponentClass<TOuterProps>;
}

interface MapStateToProps<Store extends SharedStore, TInnerProps, TOuterProps> {
  (state: Store, ownProps: TInnerProps & TOuterProps): Partial<TInnerProps>;
}


export function connect<Store extends SharedStore, TInnerProps, TOuterProps>(
  storeId: string,
  storeToProps: MapStateToProps<Store, TOuterProps, TInnerProps>
) {
  return (InnerComponent: React.ElementType): ComponentDecorator<TInnerProps, TOuterProps> => {
    class MapHoc extends React.Component<TOuterProps & TInnerProps, Store['state']> {
      private mounted: boolean = false
      // @ts-ignore
      store: Store
      static contextTypes: any

      constructor(props: any, context: any) {
        super(props, context)
        if (!context[storeId]) {
          /* eslint-disable no-console */
          console.error(`SharedState provider was not found at context.${storeId}`)
          /* eslint-enable no-console */
          return
        }
        this.store = context[storeId]
        this.store.onStateChange.add(this.onStateChange)

        this.state = storeToProps(this.store, props) as Store['state']
      }

      onStateChange = () => {
        if (!this.mounted) return
        let newLocalState: Store['state'] = storeToProps(this.store, this.props)
        for (let key of Object.keys(newLocalState)) {
          if (newLocalState[key] !== this.state[key]) {
            this.setState(newLocalState)
            break
          }
        }
      }

      componentDidMount(): void {
        this.mounted = true
      }

      componentWillUnmount(): void {
        this.mounted = false
      }


      render() {
        return (
          <InnerComponent
            {...this.props}
            {...this.state}
          />
        )
      }
    }

    MapHoc.contextTypes = {
      [storeId]: PropTypes.any
    }

    return MapHoc as unknown as ComponentDecorator<any, TOuterProps>
  }
}
