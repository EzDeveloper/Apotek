'use strict'

class TransactionController {
	
	* index(request, response) {
		const transaction = yield Transaction.all()
		yield response.sendView('transaction/index',{transaction:transaction.toJSON()})
	}

	* custom(request, response){
		const startDate = request.input('startDate')
		const endDate = request.input('endDate')
		const transaction = yield Transaction.query().whereBetween('created_at',[startDate,endDate])
	}
}

module.exports = TransactionController
