'use strict'

const Lucid = use('Lucid')

class Stock extends Lucid {

	static get rules(){
		return {
			name: 'required|unique:roles,name|max:100',
			storage_amount: 'required|above:0',
			price: 'required|above:0'
		}
	}

	static updateRules(stockId){
    	return {
    		name: `required|unique:roles,name,id,$(stockId)|max:100`,
    		storage_amount: 'required|above:0',
			price: 'required|above:0'
    	}
    }
}

module.exports = Stock
