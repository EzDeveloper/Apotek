'use strict'

const Schema = use('Schema')

class IngredientsTableSchema extends Schema {

  up () {
    this.create('ingredients', (table) => {
      table.increments()
      table.timestamps()
      table.integer('stock_id').notNullable().unsigned().references('id').inTable('stocks')
      table.integer('amount').notNullable().unsigned()
      table.integer('price').notNullable().unsigned()
    })
  }

  down () {
    this.drop('ingredients')
  }

}

module.exports = IngredientsTableSchema
