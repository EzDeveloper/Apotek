'use strict'

const Schema = use('Schema')

class RolesTableSchema extends Schema {

  up () {
    this.create('roles', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 40).unique().notNullable()
    })
  }

  down () {
    this.drop('roles')
  }

}

module.exports = RolesTableSchema
