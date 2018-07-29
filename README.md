<a href="https://travis-ci.org/soofty/react-shared-state"><img src="https://travis-ci.org/soofty/react-shared-state.svg?branch=master" /></a>

# React Shared State

Very simple shared store for your react app.

## Quickstart

1. Install  
   `yarn add react-shared-state` or `npm install react-shared-state`

2. Create provider
    
    `simple-provider.js`
    ```javascript
    import React from 'react'
    import { createProvider } from 'react-shared-state'
    
    const SimpleProvider = createProvider('simple_provider')
    ```

3. Add it to your app root  
    `app.js`
    
    ```javascript
    export function App() {
      return (
        <SimpleProvider initialState={{ name: 'Anonymous' }}>
          <Hello />
        </SimpleProvider>
      )
    }
    ```

4. Use it with your component

    `hello.js`
    ```javascript
    import React from 'react'
    import { SimpleProvider } from './simple-provider.js'
    
    const HelloComponent = (props) => {
      <div>
        <h1> Hello, {props.name} </h1>
        <button onClick={() => props.store.setState({ name: 'John' })}>Set Name</button>
      </div>
    }
    
    export const Hello = SimpleProvider.connect((store) => ({
      store,
      name: store.state.name
    }))(HelloComponent) 
    ```


### Logging
You can add logging for all stores

```javascript
import { ProviderComponent} from 'react-shared-state'

ProviderComponent.DEBUG = true
```

or individually

```javascript
<SimpleProvider ... debug={true}>
   ...
</SimpleProvider>
```
![image](https://user-images.githubusercontent.com/29029/30979245-d2b6d146-a485-11e7-81a8-da0982c027b8.png)


## 0.1.x => 0.2.x migration guide

**Important!** 0.2 has changed `connect`'s behavior.

1. mapStateToProps now accepts `store` instead of `store.state` as first argument
2. `connect` no longer passes `store` by it's name to a component
3. Preferable way to use connect is `YourProvider.connect` instead of building custom function
4. Changed Typescript's generics order from TOuterProps, TInnerProps to TInnerProps, TOuterProps (recompose format)


