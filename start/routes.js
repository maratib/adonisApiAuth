'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' };
});

Route.group(() => {

  // Test routes
  
  
  // FAQ routes
  Route.get('faq', 'FaqController.index');
  Route.post('faq', 'FaqController.create');

  // Blog routes
  Route.get('blog', 'BlogController.index');
  Route.post('blog', 'BlogController.create');

  // Page routes
  Route.get('page', 'PageController.index');
  Route.post('blog', 'PageController.create');

  // Auth routes
  Route.get('/', 'AuthController.index');
  Route.post('login', 'AuthController.login');
  Route.delete('logout', 'AuthController.logout');
  Route.post('register', 'AuthController.register');
  Route.post('update', 'AuthController.update').middleware(['auth']);

  Route.get('me', 'AuthController.me').middleware(['auth']);


}).prefix('api');


// Route.group(() => {
//   Route.get('/', 'admin/AdminController.index');
//   Route.post('register', 'AuthController.register');
//   Route.get('me', 'AuthController.me').middleware(['auth']);
// }).prefix('admin');


