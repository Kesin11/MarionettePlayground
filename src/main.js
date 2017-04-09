import Bb from 'backbone'
import Mn from 'backbone.marionette'

const date = {count: 0}

const ChildView = Mn.View.extend({
  template: "#child-tmpl",
  // triggersは直接イベントを発火させる。イベントの引数にはchildViewが付く
  triggers: {
    "click #count-up": "count:up"
  },
  // eventsはメソッドを呼び出す。引数は自分で決められる
  events: {
    "click #count-down": "countDown"
  },
  countDown: function() {
    console.log("count down")
    this.triggerMethod("child count:down", 1)
  }
})

const ParentView = Mn.View.extend({
  el: "#app",
  template: "#header",
  regions: {
    childRegion: "#child-region"
  },
  onRender() {
    this.showChildView("childRegion", new ChildView())
  },
  // 明示的にChildViewのイベントをハンドリング
  // 代わりにonChildview**というメソッドを実装していけば直接ハンドリングされる
  childViewEvents: {
    "count:up": "onCountUp",
    "count:down": "onCountDown",
  },
  onCountUp: function(childView) {
    console.log("parent onChildviewCountUp", childView)
  },
  onCountDown: function(data) {
    console.log("parent onChildviewCountDown", data)
  },
})

const model = new Bb.Model(date)
const view = new ParentView({model: model})
view.render()
