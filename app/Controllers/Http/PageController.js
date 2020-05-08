'use strict';
const Page = use('App/Models/Page');

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
    async create({ request, auth, response }) {

    }
}

module.exports = PageController;
