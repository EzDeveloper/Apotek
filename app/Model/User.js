'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class User extends Lucid {

  static boot () {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    this.addHook('beforeCreate', function * (next) {
      this.password = yield Hash.make(this.password)
      yield next
    })
  }

  static get rules(){
    return {
      email: 'required|unique:users,email|max:254|email',
      password: 'required|min:6|max:30',
      name: 'required|max:100',
      birth_date: 'required|date',
      address: 'required|max:100',
      phone: 'required|above:0|max:15',
      role_id: 'required|above:0'
    }
  }

  static get updateRules(){
    return {
      name: 'required|max:100',
      birth_date: 'required|date',
      address: 'required|max:100',
      phone: 'required|above:0|max:15',
      role_id: 'required|above:0'
    }
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  role () {
    return this.belongsTo('App/Model/Role')
  }

  medicine () {
    return this.hasMany('App/Model/Medicine')
  }

  transaction() {
    return this.hasMany('App/Model/Transaction')
  }

}

module.exports = User
