const HP_DECREMENT_VALUE = 10
let add_user_count = 1

// APIアクセスをエミュレート。非同期でstore.dataの中身を改変して返す
export default class FakeServer {
  constructor() {
    this.store = {}
  }
  setStore(store) {
    this.store = store
  }
  getCloneData() {
    return {
      counter: this.store.get('counterModel').toJSON(),
      users:   this.store.get('userCollection').toJSON(),
    }
  }
  // HPだけ減少させて0.5sec後に返す
  getNewData () {
    const new_data = this.getCloneData()
    return new Promise(resolve => {
      setTimeout(() => {
        // HPを減少させて復活したときはrevivedフラグをONにする
        const users = new_data.users
        users.forEach((user) => {
          if (user.hp <= 0) {
            user.hp = user.maxHp
            user.isRevived = true
          }
          else {
            user.hp = user.hp - HP_DECREMENT_VALUE
            user.isRevived = false
          }
        })

        resolve(new_data)
      }, 500)
    })
  }
  // 適当なユーザーを一人追加
  addUser () {
    const new_data = this.getCloneData()
    return new Promise(resolve => {
      setTimeout(() => {
        new_data.users.push({
          user_id: 100 + add_user_count,
          name: "user" + add_user_count,
          hp: 50,
          maxHp: 100,
        })
        add_user_count += 1

        resolve(new_data)
      }, 50)
    })
  }
  // ランダムにユーザーを一人削除
  removeUser () {
    const new_data = this.getCloneData()
    return new Promise(resolve => {
      setTimeout(() => {
        new_data.users.splice(Math.floor(Math.random() * new_data.users.length), 1)

        resolve(new_data)
      }, 50)
    })
  }
}
