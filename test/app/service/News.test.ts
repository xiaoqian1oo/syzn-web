import { strict as assert } from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/News.test.js', () => {
    let ctx: Context;

    before(() => {
        ctx = app.mockContext();
    });

    it('getTopStories', async () => {
        const { list } = await ctx.service.news.getList({});
        assert(list.length === 30);
    });

    it('getItem', async () => {
        const item = await ctx.service.news.info(1);
        assert(item);

        // assert(item!.id && item?.title && item.url);
    });
});
