import Bb from 'backbone'
import stickit from 'backbone.stickit' // eslint-disable-line no-unused-vars
import Mn from 'backbone.marionette'
import { UserCollectionView } from './User'

export const UserGroupModel = Bb.Model.extend({})

export const UserGroupView = Mn.View.extend({
  el: "#user-group",
  template: false,
  events: {
    "click #add-user": function() { this.action.addUser()},
    "click #remove-user": function() { this.action.removeUser()},
  },
  regions: {
    usersRegion: "#users-region",
  },
  initialize(args) {
    this.action = args.action
    this.store = args.store
    this.model = new UserGroupModel(args.store.user_group)
    this.userCollectionView = new UserCollectionView({ store: args.store })
    this.store.on('change:store', (store) => {
      this.model.set(store.state.user_group)
    })
  },
  onRender() {
    this.stickit()
    this.showChildView("usersRegion", this.userCollectionView)
  },
  bindings: {
    "#last-add-user": "last_add_name",
  },
})
