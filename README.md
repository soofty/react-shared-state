# React Shared State

<a href="https://travis-ci.org/soofty/react-shared-state"><img src="https://travis-ci.org/soofty/react-shared-state.svg?branch=master" /></a>

Very simple shared state for your react app.

## Install  
   ```yarn add react-shared-state```   
   or   
   ```npm install react-shared-state```

## Quickstart  
https://soofty.gitbook.io/react-shared-state/quickstart
    
### 1. Create provider

```javascript
// simple-provider.js
import React from 'react'
import { createProvider } from 'react-shared-state'

const SimpleProvider = createProvider('simple_provider')
```

### 2. Add it to your app root  
```javascript
// app.js
export function App() {
  return (
    <SimpleProvider initialState={{ name: 'Anonymous' }}>
      <Hello />
    </SimpleProvider>
  )
}
```

### 3. Use it with your component

```javascript
// hello.js
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
    
## Documentation  
https://soofty.gitbook.io/react-shared-state/documentation

## Live example  
https://codesandbox.io/s/wy308n0k88


# 0.1.x => 0.2.x migration guide

**Important!** 0.2 has changed `connect`'s behavior.

1. mapStateToProps now accepts `store` instead of `store.state` as first argument
2. `connect` no longer passes `store` by it's name to a component
3. Preferable way to use connect is `YourProvider.connect` instead of building custom function
4. Changed Typescript's generics order from TOuterProps, TInnerProps to TInnerProps, TOuterProps (recompose format)


