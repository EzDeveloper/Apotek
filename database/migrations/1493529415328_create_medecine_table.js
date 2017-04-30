'use strict'

const Schema = use('Schema')

class MedecinesTableSchema extends Schema {

  up () {
    this.create('medecines', (table) => {
      table.increments()
      table.timestamps()
      table.string('name',100).notNullable()
      table.integer('price').notNullable()
      table.integer('transaction_id').unsigned().reference('id').inTable('transactions')
    })
  }

  down () {
    this.drop('medecines')
  }

}

module.exports = MedecinesTableSchema
