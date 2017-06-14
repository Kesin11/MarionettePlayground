import FakeServer from './FakeServer'
// ActionCreatorという名前が適切かは怪しいが、ここで何かしらの処理を行って
// イベントをdispatch, storeはそれをキャッチして自身を更新してもらう

export default class ActionCreator {
  constructor(dispatcher) {
    this.server = new FakeServer()
    this.dispatcher = dispatcher
  }
  dispatch(eventName, payload) {
    this.dispatcher.trigger(eventName, payload)
  }
  startPolling() {
    this.interval = setInterval(() => {
      this.server.getNewState().then((state) => {
        this.dispatch("change:state", state)
      })
    }, 2000)
  }
  addUser() {
    this.server.addUser().then((state) => {
      this.dispatch("change:state", state)
    })
  }
  removeUser() {
    this.server.removeUser().then((state) => {
      this.dispatch("change:state", state)
    })
  }
  countUp(value, currentState) {
    const newState = { count: currentState.count + value }
    this.dispatch("change:counter", newState)
  }
  countDown(value, currentState) {
    const newState = { count: currentState.count - value }
    this.dispatch("change:counter", newState )
  }
}
