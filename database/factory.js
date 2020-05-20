'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker, i, data) => {
    return {
      name: faker.username(),
      email: ['admin@demo.com', 'agent@demo.com', 'user@demo.com'][i],
      password: '1234',
      dark:  [1,0,0][i],
      admin: [1,0,0][i],
      agent: [0,1,0][i]
    };
});

Factory.blueprint('App/Models/Page', async (faker, i, data) => {
  return {
    
    name: ['about', 'terms', 'privacy', 'contact'][i],
    lang: 'de',
    title: ['About us', 'Terms of use', 'Privacy Policy', 'Contact us'][i],
    body: faker.paragraph(),
    active: true
  };
});


Factory.blueprint('App/Models/Blog', async (faker, i, data) => {
    return {
      lang: 'de',
      title: faker.sentence(),
      body: faker.paragraph(),
      active: true
    };
});

Factory.blueprint('App/Models/Faq', async (faker, i, data) => {
    return {
      lang: 'en',
      title: faker.sentence(),
      body: faker.paragraph(),
      active: true
    };
});

