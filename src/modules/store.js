import Bb from 'backbone'
import { UserModel } from './users'
import { CounterModel } from './counter'

export default Bb.Model.extend({
  // Modelのネストを実現するのにconstructorをoverrideでは上手くいかなかったのでその後のinitializeフェーズでセットしていく
  initialize: function() {
    // TODO: これコレクションで置き換えられそう
    this.set('userModels', this.get('data').users.map((user) => { return new UserModel(user)}))
    this.set('counterModel', new CounterModel(this.get('data').counter))
  },
})
