// storeはApp全体のstateの管理とdispatchを担当
// stateはAppの状態を全て持つ普通のObject

export default class store {
  constructor(dispatcher, state) {
    this.dispatcher = dispatcher
    this.state = state

    this.dispatcher.on("change:state", this.updateState, this)
    this.dispatcher.on("change:counter", this.updateCounterState, this)
  }
  dispatch(event_name, payload) {
    this.dispatcher.trigger(event_name, payload)
  }
  on(event_name, handler) {
    this.dispatcher.on(event_name, handler, this)
  }
  // 自身のstateを上書きする
  updateState(newState) {
    this.state = Object.assign(this.state, newState)
    this.dispatch("change:store", this)
  }
  updateCounterState(newCounterState) {
    this.state.counter = Object.assign(this.state.counter, newCounterState)
    this.dispatch("change:store", this)
  }
}
