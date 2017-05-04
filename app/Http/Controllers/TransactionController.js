'use strict'

const Transaction = use('App/Model/Transaction')
const User = use('App/Model/User')
const Customer = use('App/Model/Customer')
const Role = use('App/Model/Role')
const Medicine = use('App/Model/Medicine')

class TransactionController {
	
	//Melihat semua transaksi
	* index(request, response) {
		const transactions = yield Transaction.query().with('user','customer').orderBy('created_at','desc').fetch()
		yield response.sendView('transaction/index',{transactions:transactions.toJSON()})
	}

	
	* show(request, response) {
		const transaction = yield Transaction.query().where('id',request.param('id')).with('user','cashier').fetch()
		const medicines = yield Medicine.findBy('id', transaction.id)
		yield response.sendView('transaction/show', {transaction:transaction.toJSON(), medicines:medicines.toJSON()})
	}
	

	//form transaksi baru

	* create(request, response) {
		const role = yield Role.findBy('name', 'Cashier')
		const users = yield User.query().where('role_id',role.id).fetch()
		const customers = yield Customer.all()
		yield response.sendView('transaction/create', {users:users.toJSON(), customers:customers.toJSON()})
	}


	//membuat transaksi baru
	* store(request, response) {
		const transaction = new Transaction()
		console.log(request.input('customer_id'))
		console.log(request.input('user_id'))
		transaction.customer_id = request.input('customer_id')
		transaction.user_id = request.input('user_id')
		transaction.status = 0;
		transaction.total_price = 0;
	    yield transaction.save()
	    yield response.redirect('/transaction/list')

	}


	//Display all new Transaction
	* list(request, response) {
		const transactions = yield Transaction.query().where('status',0).with('customer','user').fetch()
		yield response.sendView('transaction/list', {transactions:transactions.toJSON()})
	}

	
	// View  transaction with availlable medicine to add
	* view(request, response){
		const transaction = yield Transaction.query().where('id',request.param('id')).with('customer','user').fetch()
		const medicines = yield Medicine.query().where('status',1).whereNull('transaction_id').fetch()
		const cur_medicines = yield Medicine.query().where('transaction_id',request.param('id')).fetch();
		yield response.sendView('transaction/view', {transaction:transaction.toJSON(), medicines:medicines.toJSON(), cur_medicines:cur_medicines.toJSON()})
	}


	//add medecine to the Transaction
	* add(request, response) {
		const transaction = yield Transaction.findBy('id',request.param('id'))
		console.log(request.param('id'))
		console.log(transaction.toJSON())
		const customer = yield Customer.findBy('id',transaction.customer_id)
		console.log(customer.toJSON())
		const medicine = yield Medicine.findBy('id', request.input('medicine_id'))
		console.log(medicine.toJSON())
		if (customer.kis==1){
			transaction.total_price += (medicine.price*0.5)
		} else {
			transaction.total_price += medicine.price
		}
		medicine.transaction_id = request.param('id')
		yield transaction.save()
		yield medicine.save()
		
		yield response.redirect('/transaction/list/'+request.param('id'))
	}


	// change status of new Medecine to paid
	* pay(request, response) {
		const transaction = yield Transaction.findBy('id', request.param('id'))
		transaction.status = 1;
		yield transaction.save()
		yield response.redirect('/transaction/list')
	}


	//custom search
	* custom(request, response){
		const startDate = request.input('startDate')
		const endDate = request.input('endDate')
		const transaction = yield Transaction.query().whereBetween('created_at',[startDate,endDate])
	}


	//Admin view sale
	* sales(request, response) {
		const transactions = yield Transaction.query().where('status',1).fetch()
		yield response.sendView('transaction/sale', {transaction:transactions.toJSON()})
	}

	//Sales Detail
	* detail(request, response) {
		const transaction = yield Transaction.query().where('id', request.param('id')).with('customer','user').fetch()
		const medicines = yield Medicine.findBy('transaction_id', transaction.id)
		yield response.sendView('transaction/detail', {transaction:transaction.toJSON(), medicines:medicines.toJSON()})
	}
	
}

module.exports = TransactionController
