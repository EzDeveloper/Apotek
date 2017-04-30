'use strict'

const Schema = use('Schema')

class TransactionsTableSchema extends Schema {

  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.timestamps()
      table.integer('customer_id').unsigned().references('id').inTable('customers')
    })
  }

  down () {
    this.drop('transactions')
  }

}

module.exports = TransactionsTableSchema
