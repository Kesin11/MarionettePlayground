import { ParentView, CounterModel } from './modules/counter'
import { UserModel, UserCollectionView } from './modules/users'
import dispatcher from './modules/dispatcher'
import Store from './modules/store'

const data = {
  counter: {
    count: 0,
  },
  users: [
    { name: 'foo', hp: 100, maxHp: 200 },
    { name: 'bar', hp: 200, maxHp: 200 },
    { name: 'hoge', hp: 150, maxHp: 200 },
  ],
}

const store = new Store({dispatcher, data})

const counterModel = store.get('counterModel')
const view = new ParentView({model: counterModel})
view.render()

const userModels = store.get('userModels')
const userCollectionView = new UserCollectionView()
userModels.forEach((userModel) => { userCollectionView.collection.add(userModel) })
userCollectionView.render()

// collectionを直接操作して再render()すれば反映される
// userCollectionView.collection.reset()
// userCollectionView.rende
