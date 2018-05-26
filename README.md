<a href="https://travis-ci.org/soofty/react-shared-state"><img src="https://travis-ci.org/soofty/react-shared-state.svg?branch=master" /></a>

# React Shared State

Very simple shared store for your react app.

## 0.1.x => 0.2.x migration guide

**Important!** 0.2 has changed `connect`'s behavior.

1. mapStateToProps now accepts `store` instead of `store.state` as first argument
2. `connect` no longer passes `store` by it's name to a component
3. Preferable way to use connect is `YourProvider.connect` instead of building custom function
4. Changed Typescript's generics order from TOuterProps, TInnerProps to TInnerProps, TOuterProps (recompose format)


## Usage

### Extending State ([WebpackBin](https://codesandbox.io/s/qqk6lq7xj9))

```javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { getProvider, SharedStore } from "react-shared-state";

class GithubIssuesStore extends SharedStore {
  state = {
    loading: false,
    issuesCount: 0
  };

  loadCountFromGithub = () => {
    this.setState({ loading: true });

    fetch("https://api.github.com/repos/vmg/redcarpet/issues?state=closed")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          issuesCount: data.length,
          loading: false
        });
      });
  };

  resetCount = () => this.setState({ issuesCount: 0 });
  incrementCount = () => this.setState({ issuesCount: this.state.issuesCount += 1 });
}

const GithubProvider = getProvider("github", GithubIssuesStore);

@GithubProvider.connect((store, props) => ({
  issuesCount: store.state.issuesCount,
  loading: store.state.loading
}))
class IssuesCount extends React.Component {
  render = () => {
    const { issuesCount, loading } = this.props;
    return <h1>Issues count: {loading ? "..." : issuesCount}</h1>;
  };
}

// We can use compose as a HOC call
const ControlButtonsComponent = props => (
  <div>
    <button onClick={() => props.loadCountFromGithub()}>
      Load From GitHub
    </button>
    <button onClick={() => props.resetCount()}>Reset</button>
    <button onClick={() => props.incrementCount()}>Increment</button>
  </div>
);
const ControlButtons = GithubProvider.connect(store => ({
  loadCountFromGithub: store.loadCountFromGithub,
  resetCount: store.resetCount,
  incrementCount: store.incrementCount
}))(ControlButtonsComponent);

export class App extends Component {
  render() {
    return (
      <div>
        <GithubProvider initialState={{ issuesCount: 0 }}>
          <IssuesCount />
          <ControlButtons />
        </GithubProvider>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

```


### Logging
![image](https://user-images.githubusercontent.com/29029/30979245-d2b6d146-a485-11e7-81a8-da0982c027b8.png)

You can add logging for all stores

```
import { ProviderComponent} from 'react-shared-state'

ProviderComponent.DEBUG = true
```

or individually

```
<SimpleProvider ... debug={true}>
   ...
</SimpleProvider>
```

