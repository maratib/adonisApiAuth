'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class BlogSchema extends Schema {
  up() {
    this.create('blogs', (table) => {
      table.increments();
      table.string('lang', 2).notNullable();
      table.string('title', 254).notNullable();
      table.text('body').notNullable();
      table.boolean('active').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('blogs');
  }
}

module.exports = BlogSchema;
