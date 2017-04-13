import FakeServer from './fake_server'
// ActionCreatorという名前が適切かは怪しいが、ここで何からの処理を行って
// イベントをdispatch, storeはそれをキャッチして自身を更新してもらう

export default class ActionCreator {
  constructor(dispatcher) {
    this.server = new FakeServer()
    this.dispatcher = dispatcher
  }
  startPolling() {
    this.interval = setInterval(() => {
      this.server.getNewData().then((data) => {
        this.dispatcher.trigger("polling:success", data)
      })
    }, 2000)
  }
}
