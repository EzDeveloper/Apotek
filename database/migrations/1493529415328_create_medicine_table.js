'use strict'

const Schema = use('Schema')

class MedicinesTableSchema extends Schema {

  up () {
    this.create('medicines', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.string('name',100).notNullable()
      table.integer('status').notNullable()
      table.integer('price').notNullable()
      table.integer('transaction_id').unsigned().references('id').inTable('transactions')
    })
  }

  down () {
    this.drop('medicines')
  }

}

module.exports = MedicinesTableSchema
