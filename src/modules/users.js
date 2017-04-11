import Bb from 'backbone'
import Mn from 'backbone.marionette'

export const UserModel = Bb.Model.extend({})

const UserView = Mn.View.extend({
  template: "#user-tmpl",
})

export const UserCollectionView = Mn.CollectionView.extend({
  el: "#users",
  collection: new Bb.Collection(),
  childView: UserView
})
