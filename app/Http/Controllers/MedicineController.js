'use strict'

const Medicine = use('App/Model/Medicine')
const Validator = use('Validator')
const Ingredient = use('App/Model/Ingredient')
const Role = use('App/Model/Role')
const User = use('App/Model/User')


class MedicineController {
	
	* newMedicine(request, response) {
		const medicines = yield Medicine.query().where('status',0).with('user').orderBy('created_at','desc').fetch()
		yield response.sendView('medicine/newMedicine',{medicines:medicines.toJSON()})
	}

	* index(request, response) {
		const medicines = yield Medicine.query().whereNotNull('transaction_id').orderBy('created_at','desc').fetch()
		yield response.sendView('medicine/index',{medicines:medicines.toJSON()})
	}

	* create(request, response) {
		const role = yield Role.findBy('name','Pharmacist')
		const users = yield User.query().with('role').where('role_id',role.id).fetch()
		//console.log(users)
		yield response.sendView('medicine/create', {users:users.toJSON()})
	}

	* ready(request, response) {
		console.log(request.param('id'))
		const medicine = yield Medicine.findBy('id', request.param('id'))
		medicine.status = 1;
		yield medicine.save();
		console.log(medicine.toJSON())
		yield response.redirect('/medicine')
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
		medicine.status = 0;
		medicine.user_id = medicineData.user_id
		yield medicine.save()
		yield response.redirect('medicine/create', {successMessage: 'Created Medicine Successfully'})
	}

	* show(request, response) {
		const medicineId = request.param('id')
		const medicine = yield Medicine.findBy('id',medicineId)
		const ingredients = yield ingredients.query().where('medicine_id',medicineId).with('stock').fetch()
		yield response.sendView('medicine/detail',{medicine:medicine.toJSON(), ingredients:ingredients.toJSON()})
	}

}

module.exports = MedicineController
