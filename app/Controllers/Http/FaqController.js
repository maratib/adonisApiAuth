'use strict'

const Faq = use('App/Models/Faq');
class FaqController {
    async index({request, response}) {
        return "Hello from faq";
    }

    
    async create({ request, auth, response }) {
        const faqData = request.only(['lang', 'title', 'body']);
        console.log(faqData);
        try {
          const blog = await Faq.create(faqData);
          return response.json({ status: 'success' });
        } catch (error) {
          console.log(error); 
          return response.status(400).json({
            status: 'error',
            message: 'There was a problem creating the user, please try again later.'
          });
        }

    }
}

module.exports = FaqController
