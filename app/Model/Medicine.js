'use strict'

const Lucid = use('Lucid')

class Medicine extends Lucid {

	static get rules(){
		return {
			name: 'required|max:100',
			user_id: 'required'	
		}
	}

	transaction() {
		return this.belongsTo('App/Model/Transaction')
	}

	ingredient() {
		return this.hasMany('App/Model/ingredient')
	}
	
}

module.exports = Medicine