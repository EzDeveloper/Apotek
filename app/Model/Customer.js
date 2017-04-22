'use strict'

const Lucid = use('Lucid')

class Customer extends Lucid {
	static get rules(){
		return {
			name: 'required|max:100',
			birth_date: 'required',
			address: 'require|max:200',
			kis: 'required'
		}
	}
}

module.exports = Customer
