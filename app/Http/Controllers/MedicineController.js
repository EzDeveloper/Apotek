'use strict'

const Medicine = use('App/Model/Medicine')
const Validator = use('Validator')
const Ingredient = use('App/Model/Ingredient')
const Role = use('App/Model/Role')
const User = use('App/Model/User')


class MedicineController {
	
	* newMedicine(request, response) {
		const medicines = yield Medicine.query().whereNull('transaction_id').orderBy('created_at','desc').fetch()
		yield response.sendView('medicine/newMedicine',{medicines:medicines.toJSON()})
	}

	* index(request, response) {
		const medicines = yield Medicine.query().whereNotNull('transaction_id').orderBy('created_at','desc').fetch()
		yield response.sendView('medicine/index',{medicines:medicines.toJSON()})
	}

	* create(request, response) {
		const users = yield User.query().where('role_id',2).fetch()
		console.log(users)
		yield response.sendView('medicine/create', {users:users.toJSON()})
	}

	* store(request, response) {
		const medicineData = request.except('_csrf','submit')
		const validation = yield Validator.validate(medicineData, Medicine.rules)
		if (validation.fails()){
			yield request
				.withOnly('name','user_id') 
				.andWith({ errors:validation.messages()})
				.flash()
			response.redirect('medicine/create')
			return
		}
		const medicine = new Medicine()
		medicine.name = medicineData.name
		medicine.price = 0
		medicine.user_id = medicineData.user_id
		yield medicine.save()
		yield response.sendView('medicine/create', {successMessage: 'Created Medicine Successfully'})
	}

	* show(request, response) {
		const medicineId = request.param('id')
		const medicine = yield Medicine.findBy('id',medicineId)
		const ingredients = yield ingredients.query().where('medicine_id',medicineId).with('stock').fetch()
		yield response.sendView('medicine/detail',{medicine:medicine.toJSON(), ingredients:ingredients.toJSON()})
	}

	* destroy(request, response) {

	}
}

module.exports = MedicineController
