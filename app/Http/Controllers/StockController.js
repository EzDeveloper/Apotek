'use strict'

const Stock = use('App/Model/Stock')
const Validator = use('Validator')

class StockController {

	* index(request, response){
		 const stocks = yield Stock.query().orderBy('name','asc').fetch()
		 yield response.sendView('stock/index', {stocks: stocks.toJSON()})
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
			response.redirect('Stock/create')
			return
		}
		yield Stock.create(StockData)
		yield response.sendView('Stock/create', {successMessage: 'Created Stock Successfully'})

	}

	* show(request,response){
		const stock = yield Stock.findBy('id',request.param('id'))
		yield response.sendView('Stock/show',{stock:stock.toJSON()})
	}

	* edit(request,response){
		const stock = yield Stock.findBy('id',request.param('id'))
		yield response.sendView('Stock/edit', {stock:stock.toJSON()})
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
