import { ParentView, CounterModel } from './modules/counter'
import { UserModel, UserCollectionView } from './modules/users'

const data = {
  counter: {
    count: 0
  },
  users: [
    { name: 'foo', hp: 100, },
    { name: 'bar', hp: 200, },
    { name: 'hoge', hp: 150, },
  ],
}

const counterModel = new CounterModel(data.counter)
const view = new ParentView({model: counterModel})
view.render()

const userModels = data.users.map((user) => { return new UserModel(user) })
const userCollectionView = new UserCollectionView()
userCollectionView.render()
userModels.forEach((userModel) => { userCollectionView.collection.add(userModel) })
