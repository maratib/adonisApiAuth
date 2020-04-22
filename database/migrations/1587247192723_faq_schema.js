'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FaqSchema extends Schema {
  up () {
    this.create('faqs', (table) => {
      table.increments();
      table.string('lang', 2).notNullable();
      table.string('title', 254).notNullable();
      table.text('body').notNullable();
      table.boolean('active').defaultTo(false);
      table.timestamps();
    })
  }

  down () {
    this.drop('faqs')
  }
}

module.exports = FaqSchema
