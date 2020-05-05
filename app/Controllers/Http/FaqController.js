'use strict';

const Faq = use('App/Models/Faq');
const Validator = use('Validator');

class FaqController {

  async index({ request, response }) {
    // return await Faq.all();
    const sanitizationRules = {
      p: 'to_int',
      t: 'to_int',
      l: 'escape'
    };

    try {
      const nparams = request.only(['p', 't', 'l']);
      const params = Validator.sanitize(nparams, sanitizationRules);
      // const params = request.get();
      console.log(params);

      const currnet_page = request.input('p', '1');
      const total_per_page = request.input('t', '10');
      const lang = request.input('l', 'de');

      const page = await Faq.query().select('title', 'body').where('lang', lang)
        .orderBy('updated_at', 'desc').paginate(currnet_page, total_per_page);
      if (page !== null) return page;
      return { title: '', body: '' };
    } catch (error) {
      console.log(error);

      return response.status(400).json(
        {
          status: 'errorr',
          data: error
        }
      );
    }
  }


  async create({ request, auth, response }) {
    const sanitizationRules = {
      lang: 'escape',
      title: 'escape',
      body: 'escape'
    };
    const nparam = request.only(['lang', 'title', 'body']);
    const params = Validator.sanitize(nparam, sanitizationRules);
    console.log(params);
    try {
      const data = await Faq.create(params);
      return response.json({ status: 'success' });
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        status: 'error',
        message: 'Problem inserting data, please try again later.'
      });
    }

  }
}

module.exports = FaqController;;;
