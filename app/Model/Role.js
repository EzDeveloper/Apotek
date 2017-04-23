'use strict'

const Lucid = use('Lucid')

class Role extends Lucid {
	static get rules(){
      	return {
      		name: 'required|unique:roles,name|max:40'
      	}
    }

    static updateRules(userId){
    	return {
    		name: `required|unique:roles,name,id,$(userId)|max:40`
    	}
    }

    user () {
    	return this.hasMany('App/Model/User')
  	}

}

module.exports = Role
