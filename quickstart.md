# Quickstart

#### 1. Create provider

{% code-tabs %}
{% code-tabs-item title="simpler-provider.js" %}
```jsx
import React from 'react'
import { createProvider } from 'react-shared-state'

const SimpleProvider = createProvider()
```
{% endcode-tabs-item %}
{% endcode-tabs %}

#### 2. Add provider to the root component of your application

{% code-tabs %}
{% code-tabs-item title="app.js" %}
```jsx
export function App() {
  return (
    <SimpleProvider initialState={{ name: 'Luke SkyWalker' }}>
      <Hello />
    </SimpleProvider>
  )
}

```
{% endcode-tabs-item %}
{% endcode-tabs %}

#### 3. Connect provider's store to your component

{% code-tabs %}
{% code-tabs-item title="hello.js" %}
```jsx
import React from 'react'
import { SimpleProvider } from './simple-provider.js'

const HelloComponent = (props) => {
  <div>
    <h1> Hello, {props.name}</h1>
    <button onClick={() => props.store.setState({ name: 'Darth Vader' })}>Set Name</button>
  </div>
}

export const Hello = SimpleProvider.connect((store) => ({
  store,
  name: store.state.name
}))(HelloComponent) 

```
{% endcode-tabs-item %}
{% endcode-tabs %}

