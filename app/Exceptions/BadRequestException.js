'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class BadRequestException extends LogicalException {
  static invoke(message) {
    return new this(message || 'Invalid params', 400, 'E_BAD_REQUEST')
  }
  async handle (error, { response }) {
    response.status(500).send('Some message')
  }
}

module.exports = BadRequestException
