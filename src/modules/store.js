import Bb from 'backbone'
import { UserCollection } from './users'
import { CounterModel } from './counter'

export default Bb.Model.extend({
  // Modelのネストを実現するのにconstructorをoverrideでは上手くいかなかったのでその後のinitializeフェーズでセットしていく
  initialize: function() {
    this.initModels()

    // pollingイベント
    this.get('dispatcher').on('polling:success', this.onPollingSuccess, this)
    // ユーザー追加、削除
    this.get('dispatcher').on('add:user:success', this.onAddUser, this)
    this.get('dispatcher').on('remove:user:success', this.onRemoveUser, this)
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

    // collectionのsetは配列の中身を見て自動的に管理しているModelのupdate, add, removeをしてくれる
    this.get('userCollection').set(data.users)
    this.get('counterModel').set(data.counter)

    this.dispatch("store:change")
  },
  // ポーリング成功時にはModelを更新してイベントを発行する
  onPollingSuccess: function(newData) {
    this.set('data', newData)
    this.updateModels()
  },
  onAddUser: function(newData) {
    this.set('data', newData)
    this.updateModels()
  },
  onRemoveUser: function(newData) {
    this.set('data', newData)
    this.updateModels()
  },
})
