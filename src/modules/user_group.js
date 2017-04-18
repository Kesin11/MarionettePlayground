import Bb from 'backbone'
import stickit from 'backbone.stickit' // eslint-disable-line no-unused-vars
import Mn from 'backbone.marionette'

export const UserGroupModel = Bb.Model.extend({})

export const UserGroupView = Mn.View.extend({
  el: "#user-group",
  template: false,
  events: {
    "click #add-user": function() { this.action.addUser()},
    "click #remove-user": function() { this.action.removeUser()},
  },
  initialize(args) {
    this.action = args.action
  },
  onRender() {
    this.stickit()
  },
  bindings: {
    "#user-group": "last_user_name",
  },
})
