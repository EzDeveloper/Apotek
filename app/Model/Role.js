'use strict'

const Lucid = use('Lucid')

class Role extends Lucid {
	static get rules(){
      	return {
      		name: 'required|unique:roles,name|max:40'
      	}
    }
}

module.exports = Role
