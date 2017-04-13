import Bb from 'backbone'
import { UserModel } from './users'
import { CounterModel } from './counter'

export default Bb.Model.extend({
  // Modelのネストを実現するのにconstructorをoverrideでは上手くいかなかったのでその後のinitializeフェーズでセットしていく
  initialize: function() {
    // TODO: 毎回作り直しじゃなくて本当にupdateでデータ更新でも問題ないような？
    this.initModels()

    // pollingイベント
    this.get('dispatcher').on('polling:success', this.onPollingSuccess, this)
  },
  initModels: function() {
    this.set('userModels', this.get('data').users.map((user) => { return new UserModel(user)}))
    this.set('counterModel', new CounterModel(this.get('data').counter))
  },
  updateModels: function() {
    const data = this.get('data')

    // TODO: これコレクションで置き換えられそう
    const userModels = this.get('userModels')

    // idとか無いので対応付けせずにすごい雑にupdateしてます
    userModels.forEach((userModel, i) => {
      userModel.set(data.users[i])
    })
    this.get('counterModel').set(data.counter)
  },
  // ポーリング成功時にはModelを更新してイベントを発行する
  onPollingSuccess: function(newData) {
    this.set('data', newData)
    console.log(newData.users[0].hp)
    this.updateModels()

    this.get('dispatcher').trigger('store:change')
  },
})
