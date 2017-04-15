import Bb from 'backbone'
import { UserCollection } from './users'
import { CounterModel } from './counter'

export default Bb.Model.extend({
  // Modelのネストを実現するのにconstructorをoverrideでは上手くいかなかったのでその後のinitializeフェーズでセットしていく
  initialize: function() {
    // TODO: 毎回作り直しじゃなくて本当にupdateでデータ更新でも問題ないような？
    this.initModels()

    // pollingイベント
    this.get('dispatcher').on('polling:success', this.onPollingSuccess, this)
  },
  dispatch(event_name, payload) {
    this.get('dispatcher').trigger(event_name, payload)
  },
  initModels: function() {
    this.set('userCollection', new UserCollection(this.get('data').users))
    this.set('counterModel', new CounterModel(this.get('data').counter))
  },
  updateModels: function() {
    const data = this.get('data')

    // idとか無いので対応付けせずにすごい雑にupdateしてます
    this.get('userCollection').models.forEach((userModel, i) => {
      userModel.set(data.users[i])
    })
    this.get('counterModel').set(data.counter)
  },
  // ポーリング成功時にはModelを更新してイベントを発行する
  onPollingSuccess: function(newData) {
    this.set('data', newData)
    this.updateModels()

    this.dispatch("store:change")
  },
})
