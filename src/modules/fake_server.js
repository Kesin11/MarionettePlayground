const HP_DECREMENT_VALUE = 10

// APIアクセスをエミュレート。非同期でstore.dataの中身を改変して返す
export default class FakeServer {
  constructor() {
    this.store = {}
  }
  setStore(store) {
    this.store = store
  }
  // HPだけ減少させて0.5sec後に返す
  getNewData () {
    const new_data = {
      counter: this.store.get('counterModel').toJSON(),
      users:   this.store.get('userCollection').toJSON(),
    }

    return new Promise(resolve => {
      setTimeout(() => {
        // HPを減少させる
        const users = new_data.users
        users.forEach((user) => {
          if (user.hp <= 0) return user.hp = user.maxHp
          return user.hp = user.hp - HP_DECREMENT_VALUE
        })

        resolve(new_data)
      }, 500)
    })
  }
}
