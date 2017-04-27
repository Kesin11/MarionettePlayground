// StoreとActionを持つViewの基底クラス

import Mn from 'backbone.marionette'

export const ContainerView = Mn.View.extend({
  initialize(args) {
    this.store = args.store
    this.store.on("change:store", (_store) => {
      this.onChangeStore(this.getState())
    })
    if (args.store) this.action = args.action
  },
  getState: function(_store) {
    // storeからこのViewに対応するstateを取り出す方法
    throw "Not implemented error. Must be override getState()"
  },
  onChangeStore: function(state) {
    // Modelを更新する
    // それ以外のことも行いたければoverrideする
    this.model.set(state)
  },
})

export const ContainerCollectionView = Mn.CollectionView.extend({
  initialize(args) {
    this.store = args.store
    this.store.on("change:store", (store) => {
      const state = this.getState(store)
      this.onChangeStore(state)
    })
    if (args.store) this.action = args.action
  },
  getState: function() {
    throw "Not implemented error. Must be override getState()"
  },
  onChangeStore: function(state) {
    this.collection.set(state)
  },
})
