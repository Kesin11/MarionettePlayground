import FakeServer from './fake_server'
// ActionCreatorという名前が適切かは怪しいが、ここで何からの処理を行って
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
      this.server.getNewData().then((data) => {
        this.dispatch("polling:success", data)
      })
    }, 2000)
  }
  addUser() {
    this.server.addUser().then((data) => {
      this.dispatch("add:user:success", data)
    })
  }
  removeUser() {
    this.server.removeUser().then((data) => {
      this.dispatch("remove:user:success", data)
    })
  }
}
