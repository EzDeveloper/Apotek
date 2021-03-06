'use strict'

const Medicine = use('App/Model/Medicine')
const Ingredient = use('App/Model/Ingredient')
const Stock = use('App/Model/Stock')
const Validator = use('Validator')

class IngredientController {

	* index(request, response){
		 const ingredients = yield Ingredient.query().with('stock').orderBy('created_at','desc').fetch()
		 yield response.sendView('Ingredient/index', {ingredients: ingredients.toJSON()})
	}

	* create(request, response){
		const medicine = yield Medicine.findBy('id',request.param('id'))
		//const ingredients = yield Ingredient.query().whereNull('medicine_id').with('stock').fetch()
		const ingredients = yield Ingredient.query().where('medicine_id',request.param('id')).with('stock').fetch()
		const stocks = yield Stock.all()
		yield response.sendView('ingredient/create',{ medicine:medicine.toJSON(), ingredients:ingredients.toJSON(), stocks:stocks.toJSON()})
	}

	* store(request, response){
		const ingredientData = request.except('_csrf','submit')
		const messages = {
  			'stock_id.required' : 'Stock name must not be empty',
  			'stock_id.above' : 'Not such stock exist'
		}
		const medicineId = request.param('id')
		var validation = yield Validator.validate(ingredientData, Ingredient.rules, messages)
		if (validation.fails()){
			yield request
				.withOnly('stock_id','amount') 
				.andWith({ errors:validation.messages()})
				.flash()
			response.redirect(medicineId+'/create')
			return
		}
		//cari stock sesuai stock_id di ingredient & rubah storage_amount
		const stock = yield Stock.findBy('id',ingredientData.stock_id)
		const amount = request.input('amount')
		stock.storage_amount = stock.storage_amount-parseInt(amount)
		//cel stock apakah amount cukup
		validation = yield Validator.validate(stock,Stock.rules)

		if (validation.fails()){
			yield request
				.withOnly('stock_id','medicine_id','amount') 
				.andWith({ errors:validation.messages()})
				.flash()
			response.redirect('/medicine/'+medicineId+'/ingredient')
			return
		}
		const ingredient = new Ingredient()
		ingredient.stock_id = ingredientData.stock_id
		ingredient.medicine_id = medicineId
		ingredient.amount = ingredientData.amount
		ingredient.price = (ingredientData.amount*stock.price)

		yield stock.save()
		yield ingredient.save()
		const medicine = yield Medicine.findBy('id',medicineId)
		medicine.price += ingredient.price
		yield medicine.save()
		const ingredients = yield Ingredient.query().whereNull('medicine_id').with('stock').fetch()
		const stocks = yield Stock.all()
		yield response.redirect('/medicine/'+medicineId+'/ingredient')
	}

	* show(request,response){
		const ingredient = yield Ingredient.query().where('id',request.param('id')).with('stock','medicine').fetch()
		//const user = yield User.query().where('id',request.param('id')).with('role').fetch()
		yield response.sendView('ingredient/show',{ingredient:ingredient.toJSON()})
	}

	/*
	* edit(request,response){
		const ingredient = yield Ingredient.findBy('id',request.param('id'))
		yield response.sendView('ingredient/edit', {ingredient:ingredient.toJSON()})
	}

	
	* update(request,response){
		const ingredientId = request.param('id')
		const ingredientData = request.except('')
		const messages = {
  			'stock_id.required' : 'Stock name must not be empty',
  			'stock_id.above' : 'No such stock exist',
  			'medicine_id.required': 'Medicine name must not be empty',
  			'medicine_id.above' : 'No such medicine exist'
		}
		const validation = yield Validator.validate(ingredientData, Ingredient.rules, messages)
		if (validation.fails()){
			yield request
				.withOnly('role_id','amount','price','medicine_id') 
				.andWith({ errors:validation.messages()})
				.flash()
			response.redirect(ingredientId+'/edit')
			return
		}
		
		const ingredient = yield Ingredient.findBy('id', ingredientId)
		ingredient.stock_id = IngredientData.stock_id
		ingredient.amount = IngredientData.amount
		ingredient.price = IngredientData.price
		ingredient.medicine_id = Ingredient.
		yield ingredient.save()
		yield response.redirect(ingredientId)
	}
	*/

	/*
	* destroy(request,response){
		const ingredient = yield Ingredient.findBy('id',request.param('id')).with('medicine')
		console.log(ingredient.toJSON())
		const stock = yield Stock.findBy('id',ingredient.stock_id)
		stock.storage_amount = (stock.storage_amount + ingredient.amount)
		yield ingredient.delete()
		yield response.redirect('/ingredient')
	}
	*/
}

module.exports = IngredientController
