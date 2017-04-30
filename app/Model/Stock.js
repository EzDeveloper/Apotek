'use strict'

const Lucid = use('Lucid')

class Stock extends Lucid {

	static get rules(){
		return {
			name: 'required|unique:roles,name|max:100',
			storage_amount: 'required|above:-1',
			price: 'required|above:-1'
		}
	}

	static updateRules(stockId){
    	return {
    		name: `required|unique:roles,name,id,$(stockId)|max:100`,
    		storage_amount: 'required|above:-1',
			price: 'required|above:-1'
    	}
    }

    ingredients() {
    	return this.hasMany('App/Model/ingredient')
    }
}

module.exports = Stock
