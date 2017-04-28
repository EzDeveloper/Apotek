'use strict'

const Lucid = use('Lucid')

class Customer extends Lucid {
	static get rules(){
		return {
			name: 'required|max:100',
			birth_date: 'required',
			address: 'required|max:200',
			phone: 'required|max:15|'
			kis: 'required'
		}
	}
}

module.exports = Customer
