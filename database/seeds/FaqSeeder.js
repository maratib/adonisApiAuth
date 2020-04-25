'use strict'

/*
|--------------------------------------------------------------------------
| FaqSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class FaqSeeder {
  async run () {
    await Factory.model('App/Models/Faq').createMany(25);
    console.log(`${this.constructor.name} done ...`);
  }
}

module.exports = FaqSeeder
