'use strict';

const User = use('App/Models/User');

class AuthController {
  async index(request, response) {
    return { greeting: 'Hello world in JSON' };
  }
  async register({ request, auth, response }) {
    const userData = request.only(['name', 'email', 'password']);
    console.log(userData);


    try {
      const user = await User.create(userData);

      const token = await auth.generate(user);

      return response.json({
        status: 'success',
        data: token
      });
    } catch (error) {
      console.log(error);

      return response.status(400).json({
        status: 'error',
        message: 'There was a problem creating the user, please try again later.'
      });
    }
  }

  async login({ request, auth, response }) {
    console.log('In login');

    const { email, password } = request.only(['email', 'password']);
    try {

      console.log(email);
      console.log(password);

      const token = await auth.attempt(email, password);
      console.log(token);

      console.log('Login attempt');


      return response.json({
        status: 'success',
        data: token
      });
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'Invalid email/password.'
      });
    }
  }

  async logout({ auth, response }) {
    try {
      const token = await auth.logout();
      console.log('Logout attempt');
      return response.json({
        status: 'success',
        data: ''
      });
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'Logging out'
      });
    }
  }

  async me({ auth, response }) {
    return response.json({
      status: 'success',
      data: auth.user
    });
  }
}

module.exports = AuthController;
