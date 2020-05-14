'use strict';
const Blog = use('App/Models/Blog');
const Validator = use('Validator');
class BlogController {
  async index({ request, response }) {
    // return await Faq.all();
    const sanitizationRules = {
      p: 'to_int',
      t: 'to_int',
      l: 'escape'
    };

    try {
      const nparams = request.only(['p', 't', 'l', 'body']);
      const params = Validator.sanitize(nparams, sanitizationRules);
      // const params = request.get();
      console.log(params);

      const currnet_page = request.input('p', 0);
      const total_per_page = request.input('t', 0);
      const lang = request.input('l', 'de');
      let pages;
      if (nparams.body) {
        pages = await Blog.query().select('id', 'title', 'body').where('lang', lang)
          .orderBy('created_at', 'desc').paginate(currnet_page, total_per_page);
      } else {
        if (currnet_page, total_per_page) {
          pages = await Blog.query().select('id', 'title').where('lang', lang)
            .orderBy('created_at', 'desc').paginate(currnet_page, total_per_page);
        } else {
          pages = await Blog.query().select('id', 'title').where('lang', lang)
            .orderBy('created_at', 'desc').fetch();
          // pages = {data: pages};
        }
      }
      if (pages !== null) {
        if (nparams.body) {
          for (let i in pages.rows) {
            const page = pages.rows[i]
            // page.body = page.body.replace(/(([^\s]+\s\s*){10})(.*)/,"$1…");
            page.body = page.body.slice(0, 500) + ' ...';
          }
        }
        // await this.usingAwait(2000);
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
    const blogData = request.only(['lang', 'title', 'body']);
    console.log(blogData);
    try {
      const blog = await Blog.create(blogData);
      return response.json({ status: 'success' });
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem creating the user, please try again later.'
      });
    }
  }

  async edit({ request, response }) {
    const blogData = request.only(['id', 'br']);
    console.log(blogData);
    try {
      const blog = await Blog.query().select('id', 'lang', 'title', 'body').where('id', blogData.id).first()
      // const data = { data: blog};
      if (blogData.br) {
        blog.body = blog.body.replace(/(?:\r\n|\r|\n)/g, '<br/>');
      }

      return response.json({ status: 'success', data: blog });
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem creating the user, please try again later.'
      });
    }
  }

  async update({ request, response }) {
    const blogData = request.only(['id', 'lang', 'title', 'body']);
    // console.log(blogData);
    try {
      const blog = await Blog.find(blogData.id);
      blog.lang = blogData.lang;
      blog.title = blogData.title;
      blog.body = blogData.body;

      await blog.save();


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
    const blogData = request.only(['id']);
    console.log(blogData.id);
    try {
      const blog = await Blog.find(blogData.id);
      await blog.delete();
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

module.exports = BlogController;
