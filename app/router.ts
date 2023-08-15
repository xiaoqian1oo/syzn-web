import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;
    const auth = app.middleware.auth();

    // router.redirect('/', '/news');
    router.get('/', controller.web.index);

    router.get('/news', controller.web.news); // 新闻资讯
    router.get('/download', controller.web.download); // 新闻资讯
    router.get('/news-detail', controller.web.newsDetail); // 新闻详情
    router.get('/product', controller.web.product); // 产品中心
    router.get('/product-detail', controller.web.productDetail); // 产品详情
    router.get('/video', controller.web.video); // 视频中心
    router.get('/video-detail', controller.web.videoDetail); // 视频中心
    router.get('/case', controller.web.case); // 使用案例
    router.get('/case-detail', controller.web.caseDetail); // 案例详情
    router.get('/honor', controller.web.honor); // 荣誉资质
    router.get('/contact', controller.web.contact); // 联系我们

    router.get('/company', controller.web.company); // 公司简介
    router.get('/cooper', controller.web.cooper); // 合作客户

    // router.get('/news/item/:id', controller.web.detail);
    // router.get('/news/user/:id', controller.web.user);

    // app.middleware.auth({ required: false }),

    router.post('/api/v1/user/login', controller.user.login); // 登录
    router.post('/api/v1/user/register', controller.user.register); // 注册
    router.post('/api/v1/user/edit_password', controller.user.updatePassword); // 修改密码
    router.post('/api/v1/user/list', app.middleware.auth({ required: false }), controller.user.list); // 用户列表
    router.post('/api/v1/user/insert', auth, controller.user.register); // 添加用户
    router.post('/api/v1/user/update', auth, controller.user.update); // 修改用户


    router.get('/api/v1/company/info', auth, controller.company.info); // 获取公司信息
    router.post('/api/v1/company/update', auth, controller.company.update); // 修改公司信息


    // router.post('/api/v1/banner/list', controller.banner.list); // 查询banner
    // router.post('/api/v1/banner/insert', auth, controller.banner.insert); // 添加banner
    // router.post('/api/v1/banner/delete', auth, controller.banner.delete); // 删除banner
    // router.post('/api/v1/banner/update', auth, controller.banner.update); // 修改banner


    router.post('/api/upload', controller.common.upload); // 查询banner


    router.post('/api/v1/news/list', app.middleware.auth({ required: false }), controller.news.list); // 查询新闻
    router.post('/api/v1/news/insert', auth, controller.news.insert); // 添加新闻
    router.post('/api/v1/news/delete', auth, controller.news.delete); // 删除新闻
    router.post('/api/v1/news/update', auth, controller.news.update); // 修改新闻

    router.post('/api/v1/menu/list', app.middleware.auth({ required: false }), controller.menu.list); // 查询菜单
    router.post('/api/v1/menu/insert', auth, controller.menu.insert); // 添加菜单
    router.post('/api/v1/menu/delete', auth, controller.menu.delete); // 删除菜单
    router.post('/api/v1/menu/update', auth, controller.menu.update); // 修改菜单

    router.post('/api/v1/menu/classify', app.middleware.auth({ required: false }), controller.menu.classify); // 菜单分类


    router.post('/api/v1/goods/list', app.middleware.auth({ required: false }), controller.goods.list); // 查询产品
    router.post('/api/v1/goods/insert', auth, controller.goods.insert); // 添加产品
    router.post('/api/v1/goods/delete', auth, controller.goods.delete); // 删除产品
    router.post('/api/v1/goods/update', auth, controller.goods.update); // 修改产品


    router.post('/api/v1/file/list', app.middleware.auth({ required: false }), controller.file.list); // 查询文件下载
    router.post('/api/v1/file/insert', auth, controller.file.insert); // 添加文件下载
    router.post('/api/v1/file/delete', auth, controller.file.delete); // 删除文件下载
    router.post('/api/v1/file/update', auth, controller.file.update); // 修改文件下载


    router.post('/api/v1/video/list', app.middleware.auth({ required: false }), controller.video.list); // 查询视频
    router.post('/api/v1/video/insert', auth, controller.video.insert); // 添加视频
    router.post('/api/v1/video/delete', auth, controller.video.delete); // 删除视频
    router.post('/api/v1/video/update', auth, controller.video.update); // 修改视频


    router.post('/api/v1/home/list', app.middleware.auth({ required: false }), controller.home.list); // 查询首页模块
    router.post('/api/v1/home/insert', auth, controller.home.insert); // 添加首页模块
    router.post('/api/v1/home/delete', auth, controller.home.delete); // 删除首页模块
    router.post('/api/v1/home/update', auth, controller.home.update); // 修改首页模块
};
