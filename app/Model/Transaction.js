'use strict'

const Lucid = use('Lucid')


class Transaction extends Lucid {
	
	static get rules(){

	}
	
	  medicine () {
    	return this.hasMany('App/Model/medicine')
  	}

  	customer() {
  		return this.belongsTo('App/Model/customer')
  	}

  	user() {
  		return this.belongsTo('App/Model/User')
  	}

}

module.exports = Transaction
