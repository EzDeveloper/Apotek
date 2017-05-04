'use strict'

const Customer = use('App/Model/Customer')
const Transaction = use('App/Model/Transaction')
const Medicine = use('App/Model/Medicine')
const Validator = use('Validator')

class CustomerController {

	* index(request, response){
		 const customers = yield Customer.all()
		 yield response.sendView('customer/index', {customers: customers.toJSON()})
	}

	* create(request, response){
		yield response.sendView('customer/create')
	}

	* store(request, response){
		const customerData = request.except('_csrf','submit')
		if(customerData.kis == 'on'){
			customerData.kis = true;
		} else {
			customerData.kis = false;
		}
		const validation = yield Validator.validate(customerData, Customer.rules)
		if (validation.fails()){
			yield request
				.withOnly('name','birth_date','address','phone') 
				.andWith({ errors:validation.messages()})
				.flash()
			response.redirect('customer/create')
			return
		}
		yield Customer.create(customerData)
		yield response.sendView('customer/create',{successMessage: 'Created Customer Successfully'})

	}

	* show(request,response){
		const customer = yield Customer.findBy('id',request.param('id'))
		yield response.sendView('customer/show', {customer:customer.toJSON()})
	}

	* edit(request,response){
		const customer = yield Customer.findBy('id',request.param('id'))
		yield response.sendView('customer/edit', {customer:customer.toJSON()})
	}

	* update(request,response){
		const customerId = request.param('id')
		const customerData = request.except('_csrf','submit')
		if(customerData.kis == 'on'){
			customerData.kis = true;
		} else {
			customerData.kis = false;
		}
		const validation = yield Validator.validate(customerData, Customer.rules)
	
		if(validation.fails()){
			yield request
			.withOnly('name','birth_date','address','phone','kis')
			.andWith({errors:validation.messages()})
			.flash()
			response.redirect(customerId+'/edit')
			return
		}

		const customer = yield Customer.findBy('id', customerId)
		customer.name = customerData.name
		customer.birth_date = customerData.birth_date
		customer.address = customerData.address
		customer.phone = customerData.phone
		customer.kis = customerData.kis
		yield customer.save()
		yield response.redirect(customerId)
	}

	* destroy(request,response){
		const customer = yield Customer.findBy('id',request.param('id'))
		yield customer.delete()
		yield response.redirect('/customer')
	}


	* all(request, response) {
		const customers = yield Customer.all()
		yield response.sendView('/customer/all', customer:customer.toJSON())
	}

	//new customer medicines
	* detail(request, response){
		const customer = yield Customer.findBy('id', request.param('id'))
		const transactions = yield Transaction.findBy('customer_id',customer.id)
		const medicines = yield transactions.medicine().fetch()
		yield response.sendView('/customer/detail',{medicines:medicines.toJSON()})
	}

}

module.exports = CustomerController
