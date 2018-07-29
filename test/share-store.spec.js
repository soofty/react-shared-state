import { SharedStore } from '../src'
import 'raf/polyfill'

describe('SharedStore', () => {

  it('should set debug locally', () => {
    let called = false

    class TestStore extends SharedStore {

      // eslint-disable-next-line
      stateDidSet(oldState, newState) {
        called = true
      }
    }

    new TestStore('asd').setState({hello: 'world'})

    expect(called).toBeTruthy()
  })
})
