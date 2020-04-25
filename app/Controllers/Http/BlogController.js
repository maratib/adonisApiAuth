'use strict';
const Blog = use('App/Models/Blog');
class BlogController {
  async index(request, response) {
    // let data = ['blog/Blog 1HIT3', 'de/blog/Blog 1 DE', 'blog/Blog 3HIT3'];
    // return { greeting: 'Hello world in Blogs' };

    return await Blog.all();
    // return "Blogs list";
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


}

module.exports = BlogController;
