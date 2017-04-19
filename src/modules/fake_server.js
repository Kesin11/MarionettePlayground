const HP_DECREMENT_VALUE = 10
let add_user_count = 1

// APIアクセスをエミュレート。非同期で新しいstateを返す
export default class FakeServer {
  constructor() {
    this.store = {}
  }
  setStore(store) {
    this.store = store
  }
  cloneState(state) {
    // NOTE: この方法はfunctionとかはコピーされないので注意。stateは単純Objectなのでこれで十分
    return JSON.parse(JSON.stringify(state))
  }
  // HPだけ減少させて0.5sec後に返す
  getNewState () {
    const newState = this.cloneState(this.store.state)
    return new Promise(resolve => {
      setTimeout(() => {
        // HPを減少させて復活したときはrevivedフラグをONにする
        newState.users.forEach((user) => {
          if (user.hp <= 0) {
            user.hp = user.maxHp
            user.isRevived = true
          }
          else {
            user.hp = user.hp - HP_DECREMENT_VALUE
            user.isRevived = false
          }
        })

        resolve(newState)
      }, 500)
    })
  }
  // 適当なユーザーを一人追加
  addUser () {
    const newState = this.cloneState(this.store.state)
    return new Promise(resolve => {
      setTimeout(() => {
        newState.users.push({
          user_id: 100 + add_user_count,
          name: "user" + add_user_count,
          hp: 50,
          maxHp: 100,
        })
        add_user_count += 1

        resolve(newState)
      }, 50)
    })
  }
  // ランダムにユーザーを一人削除
  removeUser () {
    const newState = this.cloneState(this.store.state)
    return new Promise(resolve => {
      setTimeout(() => {
        newState.users.splice(Math.floor(Math.random() * newState.users.length), 1)

        resolve(newState)
      }, 50)
    })
  }
}
