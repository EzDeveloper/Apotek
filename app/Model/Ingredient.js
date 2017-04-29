'use strict'

const Lucid = use('Lucid')

class Ingredient extends Lucid {
	
	static get rules(){
		return {
			stock_id: 'required|above:0',
			amount: 'required|above:0',
			price: 'required|above:0'
		}
	}
}

module.exports = Ingredient
