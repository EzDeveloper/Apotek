'use strict'

const Lucid = use('Lucid')

class Medicine extends Lucid {

	static get rules(){
		return {
			name: 'required|max:100',	
		}
	}

	transaction() {
		return this.belongsTo('App/Model/transaction')
	}

	
}

module.exports = Medicine