import { ParentView } from './modules/counter'
import { UserCollectionView } from './modules/users'
import dispatcher from './modules/dispatcher'
import Store from './modules/store'
import ActionCreator from './modules/action_creator'

const data = {
  counter: {
    count: 0,
  },
  users: [
    { name: 'foo', hp: 10, maxHp: 200 },
    { name: 'bar', hp: 20, maxHp: 200 },
    { name: 'hoge', hp: 150, maxHp: 200 },
  ],
}

const store = new Store({dispatcher, data})
const action = new ActionCreator(dispatcher)

const counterModel = store.get('counterModel')
const view = new ParentView({model: counterModel})
view.render()

const userCollection = store.get('userCollection')
const userCollectionView = new UserCollectionView()
userCollectionView.collection.reset(userCollection.models)
userCollectionView.render()

// collectionを直接操作して再render()すれば反映される
// userCollectionView.collection.reset()
// userCollectionView.render

// 本来は不要だがFakeServerに状態を持たせるため
action.server.setStore(store)

action.startPolling()
