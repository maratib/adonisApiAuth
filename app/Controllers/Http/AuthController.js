'use strict';

const User = use('App/Models/User');
const BadRequestException = use('App/Exceptions/BadRequestException');
const Logger = use('Logger');

class AuthController {
  async index(request, response) {
    return { greeting: 'Hello world in JSON' };
  }
  async register({ request, auth, response }) {
    const userData = request.only(['name', 'email', 'password']);

    try {
      const user = await User.create(userData);

      const token = await auth.generate(user);

      return response.json({
        status: 'success',
        data: token
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem creating the user, please try again later.'
      });
    }
  }

  async login({ request, auth, response }) {

    const { email, password } = request.only(['email', 'password']);
    try {

      const token = await auth.attempt(email, password);

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

  async update({ auth, request, response }) {
    const { dark, password } = request.only(['dark', 'password']);
    let user = await User.find(auth.user.id);
    if (user.dark != dark) {
      user.dark = dark;
      try {
        await user.save();
        return response.json({
          status: 'success'
        });
      } catch (error) {
        response.status(400).json({
          status: 'error',
          message: 'Inable to save data.'
        });
      }
    }

  }

  async logout({ auth, response }) {
    try {
      const refreshToken = auth.getAuthHeader();
      Logger.warning('loggin info %s', 'ABC');
      

      
      if (!refreshToken) {
        throw BadRequestException.invoke('Refresh token is missing');
      }

      await auth.authenticator('jwt').revokeTokens([refreshToken], true);
      // const token = await auth.logout();
      return response.json({
        status: 'success'
      });
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'Logging out ' + error.toString()
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
