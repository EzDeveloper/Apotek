'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', table => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('name', 100).notNullable()
      table.string('address').notNullable()
      table.date('birth_date').notNullable()
      table.integer('phone', 20).notNullable()
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
