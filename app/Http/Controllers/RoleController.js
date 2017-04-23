'use strict'

const Role = use('App/Model/Role')
const Validator = use('Validator')

class RoleController {

	* index(request, response){
		 const roles = yield Role.all()
		 yield response.sendView('role/index', {roles:roles.toJSON()})
	}

	* create(request, response){
		yield response.sendView('role/create')
	}

	* store(request, response){
		const roleData = request.except('_csrf','submit')
		const validation = yield Validator.validate(roleData, Role.rules)
		if (validation.fails()){
			yield request
				.withOnly('name') 
				.andWith({ errors:validation.messages()})
				.flash()
			response.redirect('role/create')
			return
		}
		yield Role.create(roleData)
		yield response.sendView('role/create', {successMessage: 'Created role Successfully'})

	}

	* show(request,response){
		const role = yield Role.findBy('id',request.param('id'))
		yield response.sendView('role/show',{role:role.toJSON()})
	}

	* edit(request,response){
		const role = yield Role.findBy('id',request.param('id'))
		yield response.sendView('role/edit', {role:role.toJSON()})
	}

	* update(request,response){
		const roleId = request.param('id')
		const roleData = request.except('_csrf','submit')
		const validation = yield Validator.validate(roleData, Role.updateRules(roleId))
	
		if(validation.fails()){
			yield request
			.withOnly('name','birth_date','address','phone','kis')
			.andWith({errors:validation.messages()})
			.flash()
			response.redirect(roleId+'/edit')
			return
		}

		const role = yield Role.findBy('id', roleId)
		role.name = roleData.name
		yield role.save()
		yield response.redirect(roleId)
	}

	* destroy(request,response){
		const role = yield Role.findBy('id',request.param('id'))
		yield role.delete()
		yield response.redirect('/role')
	}
}

module.exports = RoleController
