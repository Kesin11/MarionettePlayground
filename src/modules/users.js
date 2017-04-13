import Bb from 'backbone'
import Mn from 'backbone.marionette'

const CLASS_NAME = {
  active: "active",
}

const UserModel = Bb.Model.extend({
  defaults: {
    "name": "empty",
    "hp": 0,
    "maxHp": 0,
    "selected": false,
  },
  toggleSelected: function() {
    if (this.get('selected')) {
      this.set('selected', false)
    }
    else {
      this.set('selected', true)
    }
  },
  getCurrentHpPercent: function() {
    return 100 * this.get('hp') / this.get('maxHp')
  },
})

export const UserCollection = Bb.Collection.extend({ model: UserModel })

const UserView = Mn.View.extend({
  template: "#user-tmpl",
  triggers: {
    "click #select-btn": "select:user",
  },
  // テンプレートに追加で渡す変数
  // css classとかviewでしか使わない変数はここで定義してModelを汚染しないようにする
  templateContext: function() {
    return {
      "activeClass": (this.model.get('selected')) ? CLASS_NAME.active : '',
      "currentHpPercent": this.model.getCurrentHpPercent(),
    }
  },
  // modelの更新を検知して自身をrender
  modelEvents: {
    "change": function() { this.render() },
  },
})

export const UserCollectionView = Mn.CollectionView.extend({
  el: "#users",
  collection: new UserCollection,
  childView: UserView,
  childViewEvents: {
    "select:user": 'onSelectUser',
  },
  onSelectUser: function(userView) {
    userView.model.toggleSelected()
  },
})
