import { Controller } from 'egg';

export default class BaseController extends Controller {
    // public async list() {
    //     const { ctx, app, service } = this;
    //     console.log('thisNewsController :>> ', this);
    //     const pageSize = app.config.news.pageSize;
    //     const page = parseInt(ctx.query.page, 10) || 1;

    //     const idList = await service.news.getTopStories(page);

    //     // get itemInfo parallel
    //     const newsList = await Promise.all(idList.map(id => service.news.getItem(id)));
    //     await ctx.render('news/list.nj', { list: newsList, page, pageSize });
    // }

    // public async detail() {
    //     const { ctx } = this;
    //     const id = ctx.params.id;
    //     const newsInfo = await ctx.service.news.getItem(id);
    //     // get comment parallel
    //     const commentList = await Promise.all(newsInfo.kids.map(_id => ctx.service.news.getItem(_id)));
    //     await ctx.render('news/detail.nj', { item: newsInfo, comments: commentList });
    // }

    // public async user() {
    //     const { ctx } = this;
    //     const id = ctx.params.id;
    //     const userInfo = await ctx.service.news.getUser(id);
    //     await ctx.render('news/user.nj', { user: userInfo });
    // }
}
