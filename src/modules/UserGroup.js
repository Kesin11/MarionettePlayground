import Bb from 'backbone'
import stickit from 'backbone.stickit' // eslint-disable-line no-unused-vars
import { ContainerView } from '../ContainerView'
import { UserCollectionView } from './User'

export const UserGroupModel = Bb.Model.extend({})

export const UserGroupView = ContainerView.extend({
  el: "#user-group",
  template: false,
  events: {
    "click #add-user": function() { this.action.addUser()},
    "click #remove-user": function() { this.action.removeUser()},
  },
  regions: {
    usersRegion: "#users-region",
  },
  initialize(_args) {
    ContainerView.prototype.initialize.apply(this, arguments)
    this.model = new UserGroupModel(this.getState())
    this.userCollectionView = new UserCollectionView({ store: this.store })
  },
  // override
  getState() {
    return this.store.user_group
  },
  onRender() {
    this.stickit()
    this.showChildView("usersRegion", this.userCollectionView)
  },
  bindings: {
    "#last-add-user": "last_add_name",
  },
})
