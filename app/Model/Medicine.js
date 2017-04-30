'use strict'

const Lucid = use('Lucid')

class Medicine extends Lucid {
	
	static get rules(){
		return {

		}
	}

	transaction() {
		return this.belongsTo('App/Model/transaction')
	}

	
}

module.exports = Medicine