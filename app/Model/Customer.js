'use strict'

const Lucid = use('Lucid')

class Customer extends Lucid {
	static get rules() {
		return {
			name: 'required|max:100',
			birth_date: 'required|date',
			address: 'required|max:200',
			phone: 'max:15|above:0',
			kis: 'required'
		}
	}
}

module.exports = Customer
