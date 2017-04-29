'use strict'

const Ingredient = use('App/Model/Ingredient')
const Validator = use('Validator')

class IngredientController {

	* index(request, response){
		 const ingredients = yield Ingredient.query().orderBy('created_at','desc').fetch()
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
		const ingredient = yield Ingredient.findBy('id',request.param('id'))
		yield response.sendView('ingredient/show',{nigredient:ingredient.toJSON()})
	}

	* edit(request,response){
		const ingredient = yield Ingredient.findBy('id',request.param('id'))
		yield response.sendView('ingredient/edit', {ingredient:ingredient.toJSON()})
	}

	* update(request,response){
		const ingredientId = request.param('id')
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
			response.redirect(ingredientId+'/edit')
			return
		}

		const ingredient = yield Ingredient.findBy('id', ingredientId)
		ingredient.stock_id = IngredientData.stock_id
		ingredient.amount = IngredientData.amount
		ingredient.price = IngredientData.price
		yield ingredient.save()
		yield response.redirect(ingredientId)
	}

	* destroy(request,response){
		const ingredient = yield Ingredient.findBy('id',request.param('id'))
		yield ingredient.delete()
		yield response.redirect('/ingredient')
	}
}

module.exports = IngredientController
