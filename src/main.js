import Bb from 'backbone'
import Mn from 'backbone.marionette'

const date = {name: 'foo', message: 'bar'}

const View = Mn.View.extend({
  el: "#app",
  template: "#header"
})

const model = new Bb.Model(date)
console.log(model)
const view = new View({model: model})
view.render()
