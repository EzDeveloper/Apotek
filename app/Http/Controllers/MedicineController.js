'use strict'

const Medicine = use('App/Model/Medicine')
const Validator = use('Validator')
const Ingredient = use('App/Model/ingredient')

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
		yield response.sendView('medicine/create')
	}

	* store(request, response) {
		const medicineData = request.except('_csrf','submit')
		const validation = yield Validator.validate(medicineData, Medicine.rules)
		if (validation.fails()){
			yield request
				.withOnly('name') 
				.andWith({ errors:validation.messages()})
				.flash()
			response.redirect('medicine/create')
			return
		}
		const medicine = new Medicine()
		medicine.name = medicineData.name
		medicine.price = 0
		yield medicine.save()
		yield response.sendView('medicine/create', {successMessage: 'Created Medicine Successfully'})
	}

	* show(request, response) {
		const medicineId = request.param('id')
		const medicine = yield Medicine.findBy('id',medicineId)
		const ingredients = yield ingredients.query().where('medicine_id',medicineId).with('stock').fetch()
		yield response.sendView('medicine/detail',{medicine:medicine.toJSON(), ingredients:ingredients.toJSON()})
	}

	* delete
}

module.exports = MedicineController
