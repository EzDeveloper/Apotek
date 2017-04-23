'use strict'

const Schema = use('Schema')

class IngredientsTableSchema extends Schema {

  up () {
    this.create('ingredients', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('ingredients')
  }

}

module.exports = IngredientsTableSchema
