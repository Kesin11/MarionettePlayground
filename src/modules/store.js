import Bb from 'backbone'
import { UserCollection } from './users'
import { CounterModel } from './counter'

export default Bb.Model.extend({
  // Modelのネストを実現するのにconstructorをoverrideでは上手くいかなかったのでその後のinitializeフェーズでセットしていく
  initialize: function() {
    this.initModels(this.get('data'))

    // pollingイベント
    this.get('dispatcher').on('polling:success', this.onPollingSuccess, this)
    // ユーザー追加、削除
    this.get('dispatcher').on('add:user:success', this.onAddUser, this)
    this.get('dispatcher').on('remove:user:success', this.onRemoveUser, this)
  },
  dispatch(event_name, payload) {
    this.get('dispatcher').trigger(event_name, payload)
  },
  initModels: function(new_data) {
    this.set('userCollection', new UserCollection(new_data.users))
    this.set('counterModel', new CounterModel(new_data.counter))
  },
  updateModels: function(new_data) {
    // collectionのsetは配列の中身を見て自動的に管理しているModelのupdate, add, removeをしてくれる
    this.get('userCollection').set(new_data.users)
    this.get('counterModel').set(new_data.counter)

    this.dispatch("store:change")
  },
  // ポーリング成功時にはModelを更新してイベントを発行する
  onPollingSuccess: function(newData) {
    this.updateModels(newData)
  },
  onAddUser: function(newData) {
    this.updateModels(newData)
  },
  onRemoveUser: function(newData) {
    this.updateModels(newData)
  },
})
