import Bb from 'backbone'
import Mn from 'backbone.marionette'

const ChildView = Mn.View.extend({
  template: "#child-tmpl",
  // triggersは直接イベントを発火させる。イベントの引数にはchildViewが付く
  triggers: {
    "click #count-up": "count:up",
  },
  // eventsはメソッドを呼び出す。引数は自分で決められる
  events: {
    "click #count-down": "countDown",
  },
  countDown: function() {
    this.triggerMethod("child count:down", 2)
  },
})

export const ParentView = Mn.View.extend({
  el: "#counter",
  template: false,
  regions: {
    childRegion: "#child-region",
  },
  ui: {
    count: "#count",
  },
  // modelのイベントをハンドリング
  modelEvents: {
    "change": "onModelChange",
  },
  onModelChange: function() {
    this.render()
  },
  onRender() {
    this.getUI('count').text(this.model.get('count'))
    this.showChildView("childRegion", new ChildView())
  },
  // 明示的にChildViewのイベントをハンドリング
  // 代わりにonChildview**というメソッドを実装していけば直接ハンドリングされる
  childViewEvents: {
    "count:up": "onCountUp",
    "count:down": "onCountDown",
  },
  onCountUp: function(_childView) {
    this.model.increment()
  },
  onCountDown: function(num) {
    this.model.decrement(num)
  },
})

export const CounterModel = Bb.Model.extend({
  increment: function() {
    this.set('count', this.get('count') + 1)
  },
  decrement: function(num) {
    this.set('count', this.get('count') - num)
  },
})
