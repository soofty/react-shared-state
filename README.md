![TravisCI](https://travis-ci.org/soofty/react-shared-state.svg?branch=master)

# React Shared State

Very simple shared store for your react app.

## Usage

### Basic Usage
1. Add provider to keep our state
2. connect function to use with this provider

```javascript
import React from 'react'
import { getProvider, connect } from 'react-shared-state/lib'

let PROVIDER_KEY = 'simple_provider'
const SimpleProvider = getProvider(PROVIDER_KEY)


let mapStateToPtops = (state, props) => ({ name: state.name })

@connect(PROVIDER_KEY, mapStateToPtops)
class Hello extends React.Component {
  render = () => (<div>
      <h1> Hello, {this.props.name} </h1>
      <button onClick={() => this.props[PROVIDER_KEY].setState({ name: 'Max' })}>Set Name</button>
    </div>
  )
}

export function App() {
  return (
    <SimpleProvider initialState={{ name: 'Anonymous' }}>
      <Hello />
    </SimpleProvider>
  )
}
```

### Extending State

```javascript
import React, { Component } from 'react'
import { getProvider, connect, SharedStore } from 'react-shared-state/lib'

class GithubIssuesState extends SharedStore {
  loadCountFromGithub = () => {
    this.setState({ loading: true })

    fetch('https://api.github.com/repos/vmg/redcarpet/issues?state=closed')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          issuesCount: data.length,
          loading: false
        })
      })
  }

  resetCount = () => this.setState({ issuesCount: 0 })
  incrementCount = () => this.setState({ issuesCount: this._state.issuesCount += 1 })
}


let PROVIDER_KEY = 'github'
const GithubProvider = getProvider(PROVIDER_KEY, GithubIssuesState)

@connect(PROVIDER_KEY, (state, props) => ({ issuesCount: state.issuesCount, loading: state.loading }))
class IssuesCount extends React.Component {
  render = () => {
    const { issuesCount, loading } = this.props
    return (
      <h1>
        Issues count: {loading ? '...' : issuesCount}
      </h1>
    )
  }
}


// We can use compose as a HOC call
const ControlButtonsComponent = (props) => (
  <div>
    <button onClick={() => props.github.loadCountFromGithub()}>
      Load From GitHub
    </button>
    <button onClick={() => props.github.resetCount()}>
      Reset
    </button>
    <button onClick={() => props.github.incrementCount()}>
      Increment
    </button>
  </div>
)
const ControlButtons = connect(PROVIDER_KEY)(ControlButtonsComponent)


export default class App extends Component {
  render() {
    return (
      <div>
        <GithubProvider initialState={{ issuesCount: 0 }}>
          <IssuesCount />
          <ControlButtons />
        </GithubProvider>
      </div>
    )
  }
}
```

### Using custom connect
It's very useful to create custom `connect` function to connect to specified provider
```

let PROVIDER_KEY = 'simple_provider'
const SimpleProvider = getProvider(PROVIDER_KEY)
const simpleConnect = (...args) => connect(PROVIDER_KEY, ...args)

let mapStateToPtops = (state, props) => ({ name: state.name })

@simpleConnect(mapStateToPtops)
class Hello extends React.Component {
   ...
}
```
