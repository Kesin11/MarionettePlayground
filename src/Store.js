// storeはApp全体のstateの管理とdispatchを担当
// stateはAppの状態を全て持つ普通のObject

export default class store {
  constructor(dispatcher, state) {
    this.dispatcher = dispatcher
    this.state = state

    this.dispatcher.on("polling:success", this.onPollingSuccess, this)
    this.dispatcher.on("add:user:success", this.onChangeUser, this)
    this.dispatcher.on("remove:user:success", this.onChangeUser, this)
    this.dispatcher.on("count:up", this.onCountUp, this)
    this.dispatcher.on("count:down", this.onCountDown, this)
  }
  // 自身のstateを上書きする
  updateState(state) {
    this.state = state
    this.dispatch("change:store", this)
  }
  dispatch(event_name, payload) {
    this.dispatcher.trigger(event_name, payload)
  }
  on(event_name, handler) {
    this.dispatcher.on(event_name, handler, this)
  }

  onPollingSuccess(newState) {
    this.updateState(newState)
  }
  onChangeUser(newState) {
    this.updateState(newState)
  }
  onCountUp(value) {
    this.state.counter.count += value
    this.dispatch("change:store", this)
  }
  onCountDown(value) {
    this.state.counter.count -= value
    this.dispatch("change:store", this)
  }

}
