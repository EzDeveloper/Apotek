'use strict'

const Schema = use('Schema')

class StocksTableSchema extends Schema {

  up () {
    this.create('stocks', (table) => {
      table.increments()
      table.timestamps()
      table.string('name',100).unique().notNullable()
      table.integer('storage_amount').notNullable()
      table.integer('price').notNullable().unsigned()
    })
  }

  down () {
    this.drop('stocks')
  }

}

module.exports = StocksTableSchema
