'use strict'

const Schema = use('Schema')

class TransactionsTableSchema extends Schema {

  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.timestamps()
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.integer('total_price').notNullable().unsigned()
      table.integer('status').notNullable()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.drop('transactions')
  }

}

module.exports = TransactionsTableSchema
