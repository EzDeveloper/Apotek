'use strict'

const Lucid = use('Lucid')

class Ingredient extends Lucid {
	
	static get rules(){
		return {
			stock_id: 'required|above:0',
			amount: 'required|above:0'
		}
	}

	stock() {
		return this.belongsTo('App/Model/Stock')
	}

	medicine() {
		return this.belongsTo('App/Model/Medicine')
	}
}

module.exports = Ingredient
