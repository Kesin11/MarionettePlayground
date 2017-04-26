import { CounterParentView } from './modules/Counter'
import { UserGroupView } from './modules/UserGroup'
import dispatcher from './Dispatcher'
import Store from './Store'
import ActionCreator from './ActionCreator'

const init_state = {
  counter: {
    count: 0,
  },
  user_group: {
    last_add_name: '',
    users: [
      { user_id: 1, name: 'foo', hp: 10, maxHp: 200 },
      { user_id: 2, name: 'bar', hp: 20, maxHp: 200 },
      { user_id: 3, name: 'hoge', hp: 150, maxHp: 200 },
    ],
  },
}

const store = new Store(dispatcher, init_state)
const action = new ActionCreator(dispatcher)

const view = new CounterParentView({ store, action })
view.render()

const userGroupView = new UserGroupView({ store, action })
userGroupView.render()

// 本来は不要だがFakeServerに状態を持たせるため
action.server.setStore(store)

action.startPolling()
