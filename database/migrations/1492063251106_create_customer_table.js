'use strict'

const Schema = use('Schema')

class CustomersTableSchema extends Schema {

  up () {
    this.create('customers', (table) => {
      table.increments()
      table.timestamps()
      table.string('name',100).notNullable()
      table.date('birth_date').notNullable()
      table.string('address',200)
      table.integer('phone',15).unsigned()
      table.boolean('kis').notNullable()
    })
  }

  down () {
    this.drop('customers')
  }

}

module.exports = CustomersTableSchema
