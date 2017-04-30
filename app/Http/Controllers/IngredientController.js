'use strict'

const Ingredient = use('App/Model/Ingredient')
const Stock = user('App/Model/Stock')
const Validator = use('Validator')

class IngredientController {

	* index(request, response){
		 const ingredients = yield Ingredient.query().with('stock').orderBy('created_at','desc').fetch()
		 yield response.sendView('Ingredient/index', {ingredients: ingredients.toJSON()})
	}

	* create(request, response){
		yield response.sendView('ingredient/create')
	}

	* store(request, response){
		const ingredientData = request.except('_csrf','submit')
		const messages = {
  			'stock_id.required' : 'Stock name must not be empty',
  			'stock_id.above' : 'Not such stock exist'
		}
		const validation = yield Validator.validate(ingredientData, Ingredient.rules, messages)
		if (validation.fails()){
			yield request
				.withOnly('role_id','amount','price') 
				.andWith({ errors:validation.messages()})
				.flash()
			response.redirect('ingredient/create')
			return
		}
		yield Ingredient.create(ingredientData)
		yield response.sendView('ingredient/create', {successMessage: 'Created Ingredient Successfully'})

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

	* destroy(request,response){
		const ingredient = yield Ingredient.findBy('id',request.param('id'))
		const stock = yield Stock.findBy('id',ingredient.stock_id)
		stock.storage_amount = (stock.storage_amount + ingredient.amount)
		yield ingredient.delete()
		yield response.redirect('/ingredient')
	}
}

module.exports = IngredientController
