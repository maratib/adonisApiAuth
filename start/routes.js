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
  Route.post('blog', 'BlogController.create').middleware(['auth']);
  Route.get('blog/edit', 'BlogController.edit');
  Route.post('blog/update', 'BlogController.update').middleware(['auth']);
  Route.delete('blog/delete', 'BlogController.delete').middleware(['auth']);

  // Page routes
  // Route.get('page', 'PageController.index');
  // Route.post('blog', 'PageController.create');
  Route.get('page', 'PageController.index');
  Route.get('page/list', 'PageController.list');
  Route.post('page', 'PageController.create').middleware(['auth']);
  Route.get('page/edit', 'PageController.edit');
  Route.post('page/update', 'PageController.update').middleware(['auth']);
  Route.delete('page/delete', 'PageController.delete').middleware(['auth']);


  // Auth routes
  Route.get('/', 'AuthController.index');
  Route.post('auth/login', 'AuthController.login');
  Route.post('auth/register', 'AuthController.register');

  Route.post('auth/update', 'AuthController.update').middleware(['auth']);
  Route.get('auth/me', 'AuthController.me').middleware(['auth']);
  Route.delete('auth/logout', 'AuthController.logout').middleware(['auth']);

}).prefix('api');


// Route.group(() => {
//   Route.get('/', 'admin/AdminController.index');
//   Route.post('register', 'AuthController.register');
//   Route.get('me', 'AuthController.me').middleware(['auth']);
// }).prefix('admin');


