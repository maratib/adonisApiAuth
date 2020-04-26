'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PageSchema extends Schema {
  up () {
    this.create('pages', (table) => {
      table.increments()
      table.string('name', 100).notNullable();
      table.string('lang', 2).notNullable();
      table.string('title', 254).notNullable();
      table.text('body').notNullable();
      table.boolean('active').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('pages')
  }
}

module.exports = PageSchema
