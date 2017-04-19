import { ParentView } from './modules/counter'
import { UserCollectionView } from './modules/users'
import { UserGroupView } from './modules/user_group'
import dispatcher from './modules/dispatcher'
import Store from './modules/store'
import ActionCreator from './modules/action_creator'

const state = {
  counter: {
    count: 0,
  },
  users: [
    { user_id: 1, name: 'foo', hp: 10, maxHp: 200 },
    { user_id: 2, name: 'bar', hp: 20, maxHp: 200 },
    { user_id: 3, name: 'hoge', hp: 150, maxHp: 200 },
  ],
}

const store = new Store(dispatcher, state)
const action = new ActionCreator(dispatcher)

const view = new ParentView({ store })
view.render()

const userGroupView = new UserGroupView({ store, action })
userGroupView.render()

const userCollectionView = new UserCollectionView({ store })
userCollectionView.render()

// 本来は不要だがFakeServerに状態を持たせるため
action.server.setStore(store)

action.startPolling()
