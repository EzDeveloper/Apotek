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
		const validation = yield Validator.validate(ingredientData, Ingredient.rules)
		if (validation.fails()){
			yield request
				.withOnly('role_id','amount','price') 
				.andWith({ errors:validation.messages()})
				.flash()
			response.redirect('ingredient/create')
			return
		}
		yield Ingredient.create(IngredientData)
		yield response.sendView('Ingredient/create', {successMessage: 'Created Ingredient Successfully'})

	}

	* show(request,response){
		const igredient = yield Ingredient.findBy('id',request.param('id'))
		yield response.sendView('ingredient/show',{igredient:igredient.toJSON()})
	}

	* edit(request,response){
		const igredient = yield Ingredient.findBy('id',request.param('id'))
		yield response.sendView('ingredient/edit', {igredient:igredient.toJSON()})
	}

	* update(request,response){
		const ingredientId = request.param('id')
		const ingredientData = request.except('_csrf','submit')
		const validation = yield Validator.validate(igredientData,Ingredient.rules)
	
		if(validation.fails()){
			yield request
			.withOnly('name','storage_amount','price') 
			.andWith({errors:validation.messages()})
			.flash()
			response.redirect(IngredientId+'/edit')
			return
		}

		const ingredient = yield Ingredient.findBy('id', IngredientId)
		ingredient.name = IngredientData.name
		ingredient.storage_amount = IngredientData.storage_amount
		ingredient.price = IngredientData.price
		yield Ingredient.save()
		yield response.redirect(IngredientId)
	}

	* destroy(request,response){
		const Ingredient = yield Ingredient.findBy('id',request.param('id'))
		yield Ingredient.delete()
		yield response.redirect('/Ingredient')
	}
}

module.exports = IngredientController
