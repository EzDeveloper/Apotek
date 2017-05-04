'use strict'

const User = use('App/Model/User')
const Role = use('App/Model/Role')
const Validator = use('Validator')
const moment = require('moment');

class UserController {

  * index(request, response){
     const users = yield User.query().with('role').fetch()
     yield response.sendView('user/index', {users:users.toJSON()})
     //console.log(users.toJSON())
  }

  * create(request, response){
    const roles = yield Role.all()
    yield response.sendView('user/create', {roles:roles.toJSON()})
  }

  * store(request, response){
    const userData = request.except('_csrf','submit')
    const validation = yield Validator.validate(userData, User.rules)
    if (validation.fails()){
      yield request
        .withOnly('email','password','name','birth_date','address','phone','role_id') 
        .andWith({ errors:validation.messages()})
        .flash()
      response.redirect('user/create')
      return
    }
    userData.birth_date = moment(userData.birth_date).format("YYYY-MM-DD")
    //console.log(userData.birth_date)
    yield User.create(userData)
    yield response.sendView('user/create', {successMessage: 'Created User Successfully'})

  }

  * show(request,response){
    const user = yield User.query().where('id',request.param('id')).with('role').fetch()
    //console.log(user.birth_date.toJSON)

    user.birth_date = moment(user.birth_date).format("YYYY-MM-DD")
    
    //console.log(user.toJSON())
    yield response.sendView('user/show', {user:user.toJSON(), moment:moment})
  }

  * edit(request,response){
    const user = yield User.query().where('id',request.param('id')).with('role').fetch()
    const roles = yield Role.all()
    user.birth_date = moment(user.birth_date).format("YYYY-MM-DD")
    console.log(user.birth_date)
    yield response.sendView('user/edit', {user:user.toJSON(), roles:roles.toJSON()})
  }

  * update(request,response){
    const userId = request.param('id')
    const userData = request.except('_csrf','submit')
    const validation = yield Validator.validate(userData, User.updateRules)
  
    if(validation.fails()){
      yield request
      .withOnly('name','birth_date','address','phone','role_id') 
      .andWith({errors:validation.messages()})
      .flash()
      response.redirect(userId+'/edit')
      return
    }

    const user = yield User.findBy('id', userId)
    user.name = userData.name
    user.birth_date = userData.birth_date
    user.address = userData.address
    user.phone = userData.phone
    user.role_id = userData.role_id
    yield user.save()
    yield response.redirect(userId)
  }

  * destroy(request,response){
    const user = yield User.findBy('id',request.param('id'))
    yield user.delete()
    yield response.redirect('/user')
  }

}

module.exports = UserController
