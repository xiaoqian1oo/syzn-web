declare interface TableBaseType {
    readonly id?: number;     // 主键id

    created_at?: string;  // 创建时间
    updated_at?: string;    // 修改时间
}



/**
 * user 数据格式
 */

declare interface UserTableType extends TableBaseType {

    username: string;   // 用户名
    account: string;     // 登录账号
    password: string;      // 密码
    status: 1 | 2;     // 状态:1正常，2禁用
    avatar: string;  // 头像

}

/**
 * news 数据格式
 */

declare interface NewsTableType extends TableBaseType {

    type: number;   // 模块 1:公司新闻 2:行业资讯
    title: string;     // 标题
    title_en: string;      // 英文标题

    img: string;     // 图片地址
    description: string; // 描述
    description_en: string; // 描述
    content: string; // 内容
    content_en: string; // 内容
    home_recommend: 1 | 2; // 是否首页推荐 1:是，2：否
    sort: number;    // 排序
}


/**
 * menu表 数据格式
 */
declare interface MenuTableType extends TableBaseType {
    parent_id: string;   //  
    title: string;   // 标题 
    title_en: string;   //  
    href: string;   // 链接 
    img: string;     // 图片
    sort: number;   //  排序
    is_show: 1 | 2;    // 是否显示
}


/**
 * classify表 数据格式
 */
declare interface ClassifyTableType extends TableBaseType {
    parent_id: number; // 上级id
    name: string; // 二级分类
    type: number; // 类型，1：视频系列
    sort: number;    // 排序
}

/**
 * video表 数据格式
 */
declare interface VideoTableType extends TableBaseType {
    title: string;   // 视频名称
    title_en:string; //视频名称 英文
    video_url: string; // 视频地址
    video_image_url: string; // 视频封面图片
    home_recommend: string; //
    belong_id: string; // 所属分类id
    sort: string; //    排序

}

/**
 * files表 数据格式
 */
declare interface FilesTableType extends TableBaseType {
    name: string; // 名称
    url: string; //  地址路径
    type: number, //    1:合作伙伴，2：文件下载
    content: string; // 内容
    sort: string; //    排序
}

/**
 * goods 数据格式
 */
declare interface GoodsTableType extends TableBaseType {
    classify_id: string; // 分类id
    title: string; //
    title_en: string; //
    video_url: string; // 视频地址
    image_url: string; // 视频封面图片
    description: string; // 描述
    description_en: string; //
    content: string; // 详细介绍
    content_en: string; //
    seo_keyword: string; // SEO关键字
    seo_description: string; //
    home_recommend: 1 | 2; //  是否首页推荐 1:是，2：否
    sort: number;    // 排序
}

/**
 * goods_image表 数据格式
 */
declare interface GoodsImageTableType extends TableBaseType {
    goods_id: string; //
    url: string; // 图片地址
    sort: number; //    排序
}



/**
 * company 公司简介表 数据格式
 */
declare interface CompanyTableType extends TableBaseType {
    name: string; // 公司名称
    name_en: string; //
    tel: string; // 电话
    address: string; // 地址
    address_en: string; //
    wx_code: string; // 微信二维码
    shop_code: string; //    商城二维码
    qq: string; // QQ
    email: string; //
    profile: string; // 公司介绍
    profile_en: string; //
    corporate_culture: string; // 企业文化
    corporate_culture_en: string; //
    corporate_culture_image: string; // 企业文化背景图片地址
    description: string; //
    description_en: string; //
    establish_date: string; // 成立日期
    service_province: string; //
    service_office: string; // 办事处多年行业经验技术团队
    seo_keyword: string; // SEO关键字
    seo_description: string; //
    logo: string; // 公司logo图片地址
    logo_mobile: string; //
    worth: string; //
    worth_en: string; //
    service_pre_sales_technical_team_tel: string; // 售前技术团队电话
    service_after_sales_technical_team_tel: string; //
    record: string; // 备案号
    honor: string; //
}

/**
 * home_image 首页表 数据格式
 */
declare interface HomeImageTableType extends TableBaseType {
    title: string; //
    title_en: string; //
    url: string; // 链接地址
    image_url: string; // 视频封面图片
    description: string; // 描述
    description_en: string; //
    screen: number; // 第几屏
    type: number; // 1：按钮链接，2：图片链接，3：首页产品中心推荐产品
}




declare interface TableTypeNoID<T> extends Exclude<T, 'id'> {

}