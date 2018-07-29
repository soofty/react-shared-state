# Documentation

## Basic concepts

To understand how to use the library you should only understand 3 basic things:

* State 
* Store
* Provider

### State

**State** is a just a dataset. For example a simple state that contains user name could be represented as

```javascript
{
    name: "Luke Skywalker"
}
```

### **Store**

**Store** is a JavaScript class that have a `state` ****property and ****`setState` method.

{% code-tabs %}
{% code-tabs-item title="minimal-store-example.js" %}
```jsx
import { SharedStore } from 'react-shared-state'

class MyStore extends SharedStore {}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

`State` property is an empty object by default

```javascript
const store = new MyStore()
console.log(store.state) // {}
```

To update the `state` you should use `setState` method.

```javascript
store.setState({name: "Luke SkyWalker"})
console.log(store.state) // {name: "Luke SkyWalker"}
```

It works the same as react's [setState](https://reactjs.org/docs/react-component.html#setstate) method

{% hint style="danger" %}
Don't update state directly or your changes will be ignored
{% endhint %}

{% hint style="info" %}
Right now setState accepts only object to update the state. Using _updater_ as a function doesn't supported
{% endhint %}

### Provider

**Provider** is a component that keeps your **store** and pass the **store** to your components.

To create provider call `createProvider` 

{% code-tabs %}
{% code-tabs-item title="name-provider.js" %}
```jsx
const NameProvider = createProvider('name_provider')
```
{% endcode-tabs-item %}
{% endcode-tabs %}

You add it to the root component of your application. 

{% code-tabs %}
{% code-tabs-item title="app.js" %}
```jsx
import { NameProvider } from './simple-provider'

export function App() {
  return (
    // We fill default state with a name
    <NameProvider initialState={{ name: 'Luke SkyWalker' }}> 
      ...
    </NameProvider>
  )
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

After that you can use it in your components using `YourProvider.connect`

{% code-tabs %}
{% code-tabs-item title="hello.js" %}
```jsx
import { NameProvider } from './name-provider.js'

const HelloComponent = (props) => {
  <div>
    <h1> Hello, {props.name}</h1>
    <button onClick={() => props.store.setState({ name: 'Darth Vader' })}>Set Name</button>
  </div>
}

export const Hello = NameProvider.connect((store, ownProps) => ({
  store,
  name: store.state.name
}))(HelloComponent) 

```
{% endcode-tabs-item %}
{% endcode-tabs %}

Connect is a High Ordered Component that accepts a `mapStoreToProps` callback with two arguments:

* `store` — a store instance being automatically created
* `ownProps` — props passed to the component

To update the state you can use `store.setState()`

To access the state use `store.state`

## Extending state

While you can use `setState` to change you **state** it's better to hide your logic with custom methods implementation

For example instead of setting name using `setState` it's better to add a custom method `setName`.

First of all let's create a **Store** class and pass it to `createProvider`.

{% code-tabs %}
{% code-tabs-item title="provider.js" %}
```jsx
import { createProvider, SharedStore } from 'react-shared-state''

class NameStore extends SharedStore {
    setName = (newName) => {
        this.setState({
            name: newName
        })
    }
}

const NameProvider = createProvider('name_provider', NameStore)
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Now you can use it in your component in props

```jsx
import { NameProvider } from './name-provider.js'

const HelloComponent = (props) => {
  return <div>
    <h1> Hello, {props.name}</h1>
    <button onClick={() => props.setName({ name: 'Darth Vader' })}>Set Name</button>
  </div>
}

export const Hello = NameProvider.connect((store, ownProps) => ({
  setName: store.setName,
  name: store.state.name
}))(HelloComponent) 
```

{% hint style="info" %}
Since we've used class properties definition `()=>` to declare the method we can pass it in `mapStoreToProps`.
{% endhint %}

{% hint style="danger" %}
Never pass `setState` method in `mapStoreToProps` because it's not declared as property in base state class and will fail to set state.
{% endhint %}

## Using State with API calls

Sometimes you have to get some data from the external source, for example API. Wonder where to add it? Just add it the store!

{% code-tabs %}
{% code-tabs-item title="provider.js" %}
```jsx
import { createProvider, SharedStore } from "react-shared-state";

class NameStore extends SharedStore {
  setName = newName => {
    this.setState({ name: newName });
  };
  fetchName = () => {
    this.setState({ loading: true });
    fetch("https://swapi.co/api/people/2/?format=json")
      .then(resp => resp.json())
      .then(data => {
        this.setState({ name: data.name });
        this.setState({ loading: false });
      });
  };
}

export const NameProvider = createProvider("name_provider", NameStore);

```
{% endcode-tabs-item %}
{% endcode-tabs %}

And use as a simple call

{% code-tabs %}
{% code-tabs-item title="hello.js" %}
```jsx
const HelloComponent = props => {
  if (props.loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1> Hello, {props.name}</h1>
      <button onClick={() => props.setName("Darth Vader")}>Set Name</button>
      <button onClick={() => props.fetchName()}>Fetch Name</button>
    </div>
  );
};

export const Hello = NameProvider.connect((store, ownProps) => ({
  fetchName: store.fetchName,
  setName: store.setName,
  name: store.state.name,
  loading: store.state.loading
}))(HelloComponent);

```
{% endcode-tabs-item %}
{% endcode-tabs %}

Also we've added a `loading` flag to indicate something is going one.

Working example available at [https://codesandbox.io/s/wy308n0k88](https://codesandbox.io/s/wy308n0k88)

