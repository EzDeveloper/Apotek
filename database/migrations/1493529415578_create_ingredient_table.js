'use strict'

const Schema = use('Schema')

class IngredientsTableSchema extends Schema {

  up () {
    this.create('ingredients', (table) => {
      table.increments()
      table.timestamps()
      table.integer('stock_id').notNullable().unsigned().references('id').inTable('stocks')
      talbe.integer('medecine_id').unsigned().references('id').inTable('medecines')
      table.integer('amount').notNullable()
      table.integer('price').notNullable()
    })
  }

  down () {
    this.drop('ingredients')
  }

}

module.exports = IngredientsTableSchema
