import Backbone from 'backbone'

const Model = Backbone.Model.extend()
const model = new Model({foo: 1, bar: 3})
console.log(model.get('foo'))
console.log(model.get('bar'))
