import { ParentView, CounterModel } from './modules/counter'

const data = {count: 0}

const counterModel = new CounterModel(data)
const view = new ParentView({model: counterModel})
view.render()
