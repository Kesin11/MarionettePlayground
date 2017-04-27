import FakeServer from './FakeServer'
// ActionCreatorという名前が適切かは怪しいが、ここで何かしらの処理を行って
// イベントをdispatch, storeはそれをキャッチして自身を更新してもらう

export default class ActionCreator {
  constructor(dispatcher) {
    this.server = new FakeServer()
    this.dispatcher = dispatcher
  }
  dispatch(event_name, payload) {
    this.dispatcher.trigger(event_name, payload)
  }
  startPolling() {
    this.interval = setInterval(() => {
      this.server.getNewState().then((state) => {
        this.dispatch("polling:success", state)
      })
    }, 2000)
  }
  addUser() {
    this.server.addUser().then((state) => {
      this.dispatch("add:user:success", state)
    })
  }
  removeUser() {
    this.server.removeUser().then((state) => {
      this.dispatch("remove:user:success", state)
    })
  }
  countUp(value, current_state) {
    const new_state = { count: current_state.count + value }
    this.dispatch("change:count", new_state)
  }
  countDown(value, current_state) {
    const new_state = { count: current_state - value }
    this.dispatch("change:count", new_state )
  }
}
