import Bb from 'backbone'
import stickit from 'backbone.stickit' // eslint-disable-line no-unused-vars
import Mn from 'backbone.marionette'

const UserModel = Bb.Model.extend({
  defaults: {
    "name": "empty",
    "hp": 0,
    "maxHp": 0,
    "isRevived": false,
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

export const UserCollection = Bb.Collection.extend({
  model: UserModel,
  // collectionのsetは配列でobjectをまとめて渡すとidが一致すればupdate, collection側にまだ無ければadd,
  // collectionにあったが配列になければremoveをやってくれる
  // idはobjectに元々存在していればそれが使われるが、modelId()で動的に指定することも可能
  modelId: function(attrs) {
    // user_idをidの代わりとして使う
    return attrs.user_id
  },
})

const UserView = Mn.View.extend({
  template: "#user-tmpl",
  className: "user",
  triggers: {
    "click #select-btn": "select:user",
  },
  // テンプレートに追加で渡す変数
  // css classとかviewでしか使わない変数はここで定義してModelを汚染しないようにする
  // templateContext: function() {
  //   return {
  //     "currentHpPercent": this.model.getCurrentHpPercent(),
  //   }
  // },
  onRender() {
    this.stickit()
  },
  bindings: {
    ":el": {
      // classのbindingsは特殊な書き方
      // onGetに条件を定義し、それが満たされたときに定義したクラス名が付けられる
      classes: {
        selected: {
          observe: "selected",
          onGet: function(selected) {
            return selected === true
          },
        },
      },
    },
    ".progress": {
      classes: {
        "revive-animation": {
          observe: "isRevived",
          onGet: function(isRevived) {
            return isRevived === true
          },
        },
      },
    },
    ".progress-bar": {
      observe: "hp",
      // 特定のattributeを変化させたい場合
      attributes: [{
        name: "style",
        observe: "hp",
        onGet: function(_hp) {
          const currentHpPercent = this.model.getCurrentHpPercent()
          return `width: ${currentHpPercent}%`
        },
      }],
    },
  },
})

export const UserCollectionView = Mn.CollectionView.extend({
  className: "users",
  childView: UserView,
  childViewEvents: {
    "select:user": 'onSelectUser',
  },
  initialize(args) {
    this.store = args.store
    this.collection = new UserCollection(this.store.state.user_group.users)
    this.store.on("change:store", (store) => {
      this.collection.set(store.state.user_group.users)
    })
  },
  onSelectUser: function(userView) {
    userView.model.toggleSelected()
  },
})