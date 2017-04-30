'use strict'

const Medicine = user('App/Model/Medicine')
const Validator = use('Validator')

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

	* 
}

module.exports = MedicineController
