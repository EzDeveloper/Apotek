'use strict'

const Stock = use('App/Model/Stock')
const Validator = use('Validator')

class StockController {

	* increase(request, response){
		const added_amount = request.input('added_amount')
		const stockId = request.param('id')
		const rules = {
			added_amount: 'required|above:0'
		}
		const validation = yield Validator.validate({added_amount},rules)//, rules)
		if (validation.fails()){
			yield request
				.withOnly('added_amount') 
				.andWith({ errors:validation.messages()})
				.flash()
			response.redirect('/stock/'+stockId+'/add')
			return
		}
		
		const stock = yield Stock.findBy('id',stockId)
		stock.storage_amount = stock.storage_amount+parseInt(added_amount)
		yield stock.save()
		response.redirect('/stock')
	} 

	* add(request, response){
		const stock = yield Stock.findBy('id',request.param('id'))
		yield response.sendView('stock/add',{stock:stock.toJSON()})
	}

	* index(request, response){
		const stocks = yield Stock.query().orderBy('name','asc').fetch()
		yield response.sendView('stock/index', {stocks: stocks.toJSON()})
	}

	* showPharmacistStock (request, response){
		const stocks = yield Stock.query().orderBy('name','asc').fetch()
		yield response.sendView('stock/showPharmacistStock', {stocks: stocks.toJSON()})
	}

	* create(request, response){
		yield response.sendView('stock/create')
	}

	* store(request, response){
		const StockData = request.except('_csrf','submit')
		const validation = yield Validator.validate(StockData, Stock.rules)
		if (validation.fails()){
			yield request
				.withOnly('name','storage_amount','price') 
				.andWith({ errors:validation.messages()})
				.flash()
			response.redirect('stock/create')
			return
		}
		yield Stock.create(StockData)
		yield response.sendView('stock/create', {successMessage: 'Created Stock Successfully'})

	}

	* show(request,response){
		const stock = yield Stock.findBy('id',request.param('id'))
		yield response.sendView('stock/show',{stock:stock.toJSON()})
	}

	* edit(request,response){
		const stock = yield Stock.findBy('id',request.param('id'))
		yield response.sendView('stock/edit', {stock:stock.toJSON()})
	}

	* update(request,response){
		const stockId = request.param('id')
		const stockData = request.except('_csrf','submit')
		const validation = yield Validator.validate(stockData, Stock.updateRules(stockId))
	
		if(validation.fails()){
			yield request
			.withOnly('name','storage_amount','price') 
			.andWith({errors:validation.messages()})
			.flash()
			response.redirect(stockId+'/edit')
			return
		}

		const stock = yield Stock.findBy('id', stockId)
		stock.name = stockData.name
		stock.storage_amount = stockData.storage_amount
		stock.price = stockData.price
		yield stock.save()
		yield response.redirect(stockId)
	}

	* destroy(request,response){
		const stock = yield Stock.findBy('id',request.param('id'))
		yield stock.delete()
		yield response.redirect('/Stock')
	}
}

module.exports = StockController
