import Bb from 'backbone'
// stickitがimportされたときにbackbone.viewがmixinで拡張される
import stickit from 'backbone.stickit' // eslint-disable-line no-unused-vars
import Mn from 'backbone.marionette'

export const CounterModel = Bb.Model.extend({
  defaults: {
    count: 0,
  },
})

const CounterChildView = Mn.View.extend({
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

export const CounterParentView = Mn.View.extend({
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
  initialize(args) {
    this.store = args.store
    this.action = args.action
    this.model = new CounterModel(this.store.state.counter)
    this.store.on("change:store", (store) => {
      this.model.set(store.state.counter)
    })
  },
  onModelChange: function() {
    this.render()
  },
  onRender() {
    // 以下の手動バインディングと同等のことをstickitが担当する
    // this.getUI('count').text(this.model.get('count'))
    this.stickit()
    this.showChildView("childRegion", new CounterChildView())
  },
  bindings: {
    "#count": "count",
  },
  // 明示的にChildViewのイベントをハンドリング
  // 実際は明示しなくてもonChildview**()というメソッドを実装するだけでハンドリングされるので省略可能
  childViewEvents: {
    "count:up": function() { this.action.countUp(1) },
    "count:down": function(value) { this.action.countDown(value) },
  },
})
