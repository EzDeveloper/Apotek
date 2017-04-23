'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')

class UserController {

  * index(request, response){
     const users = yield User.all()
     yield response.sendView('user/index', {users:users.toJSON()})
  }

  * create(request, response){
    yield response.sendView('user/create')
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
    yield User.create(userData)
    yield response.sendView('user/create', {successMessage: 'Created User Successfully'})

  }

  * show(request,response){
    const user = yield User.findBy('id',request.param('id'))
    yield response.sendView('user/show',{user:user.toJSON()})
  }

  * edit(request,response){
    const user = yield User.findBy('id',request.param('id'))
    yield response.sendView('user/edit', {user:user.toJSON()})
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
