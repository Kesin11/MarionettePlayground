import _ from 'underscore'
const HP_DECREMENT_VALUE = 10

// APIアクセスをエミュレート。非同期でdataの中身を改変して返す
export default class FakeServer {
  constructor() {
    this.data =  {}
  }
  setFakeData(data) {
    this.data = data
  }
  // HPだけ減少させて0.5sec後に返す
  getNewData () {
    const new_data = _.clone(this.data)

    return new Promise(resolve => {
      setTimeout(() => {
        const users = new_data.users
        users.forEach((user) => {
          if (user.hp <= 0) return user.hp = user.maxHp
          return user.hp = user.hp - HP_DECREMENT_VALUE
        })

        resolve(new_data)
        this.data = new_data
      }, 500)
    })
  }
}
