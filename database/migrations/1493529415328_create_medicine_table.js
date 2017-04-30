'use strict'

const Schema = use('Schema')

class MedicinesTableSchema extends Schema {

  up () {
    this.create('medicines', (table) => {
      table.increments()
      table.timestamps()
      table.string('name',100).notNullable()
      table.integer('price').notNullable()
      table.integer('transaction_id').unsigned().reference('id').inTable('transactions')
    })
  }

  down () {
    this.drop('medicines')
  }

}

module.exports = MedicinesTableSchema
