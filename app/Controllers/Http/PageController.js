'use strict';
const Page = use('App/Models/Page');
const Validator = use('Validator');
class PageController {
    async index({ request, response, locale }) {
        const pageData = request.only(['lang', 'page']);
        console.log(pageData);

        const where = { lang: pageData.lang, name: pageData.page };
        const page = await Page.query().select('title', 'body').where(where).first();
        // console.log(page);
        if (page !== null) return page;
        else {
            const page = await Page.query().select('title', 'body').where('name', pageData.page).first();
            if (page !== null) return page;
            return { title: 'Page not found', body: '' };
        }


    }
    async list({ request, response }) {
        // return await Faq.all();
        const sanitizationRules = {
          l: 'escape'
        };
    
        try {
          const nparams = request.only(['l']);
          const params = Validator.sanitize(nparams, sanitizationRules);
          // const params = request.get();
          console.log(params);
          const lang = request.input('l', 'de');
          let pages = await Page.query().select('id', 'name', 'title').where('lang', lang)
                .orderBy('name').fetch();
          if (pages !== null) {
            return pages;
          }
          return {};
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
        const blogData = request.only(['lang', 'name', 'title', 'body']);
        console.log(blogData);
        let page = await Page.query().select('id').where( {'lang': blogData.lang, 'name': blogData.name} ).first();
        if (page) {
            return response.status(400).json(
                {
                  status: 'errorr',
                  msg: 'Page already exists'
                }
              );
        }

        try {
          const page = await Page.create(blogData);
          return response.json({ status: 'success' });
        } catch (error) {
          console.log(error);
          return response.status(400).json({
            status: 'error',
            msg: 'There was a problem creating the user, please try again later.'
          });

      }
    }
    
      async edit({ request, response }) {
        const blogData = request.only(['id']);
        console.log(blogData);
        try {
          const page = await Page.query().select('id', 'lang', 'name', 'title', 'body').where('id', blogData.id).first()
          // const data = { data: blog};
        //   if (blogData.br) {
        //     blog.body = blog.body.replace(/(?:\r\n|\r|\n)/g, '<br/>');
        //   }
    
          return response.json({ status: 'success', data: page });
        } catch (error) {
          console.log(error);
          return response.status(400).json({
            status: 'error',
            message: 'There was a problem creating the user, please try again later.'
          });
        }
      }
    
      async update({ request, response }) {
        const pageData = request.only(['id', 'lang','name', 'title', 'body']);
        // console.log(blogData);
        try {
          const page = await Page.find(pageData.id);
          page.lang = pageData.lang;
          page.name = pageData.name;
          page.title = pageData.title;
          page.body = pageData.body;
    
          await page.save();
    
          return response.json({ status: 'success' });
        } catch (error) {
          console.log(error);
          return response.status(400).json({
            status: 'error',
            message: 'There was a problem updating the blog, please try again later.'
          });
        }
      }
    
      async delete({ request, response }) {
        const pageData = request.only(['id']);
        console.log(pageData.id);
        try {
          const page = await Page.find(pageData.id);
          await page.delete();
          return response.json({ status: 'success' });
        } catch (error) {
          console.log(error);
          return response.status(400).json({
            status: 'error',
            message: 'There was a problem deleting the blog, please try again later.'
          });
    
        }
      }
    
}

module.exports = PageController;
