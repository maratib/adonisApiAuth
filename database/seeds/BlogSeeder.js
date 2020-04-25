'use strict'

/*
|--------------------------------------------------------------------------
| BlogSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class BlogSeeder {
  async run () {
    await Factory.model('App/Models/Blog').createMany(25);
    console.log(`${this.constructor.name} done ...`);
  }
}

module.exports = BlogSeeder
