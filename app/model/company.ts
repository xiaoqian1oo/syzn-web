
import { Application } from 'egg';
import { Model, Optional } from 'sequelize';


type UserAttributes = CompanyTableType;

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ModelTypeInstances extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export default (app: Application) => {
    const { STRING, INTEGER } = app.Sequelize;


    const Table = app.model.define<ModelTypeInstances>('company', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键id' },
        // parent_id: {
        //     type: INTEGER,
        //     defaultValue: 0,
        //     comment: '上级id',
        // },
        name: {
            type: STRING(80),
            comment: '公司名称',
        },
        name_en: {
            type: STRING(120),
            comment: '英文公司名称',
        },
        tel: {
            type: STRING(50),
            comment: '电话',
        },
        address: {
            type: STRING(255),
            comment: '地址',
        },
        address_en: {
            type: STRING(255),
            comment: '英文地址',
        },
        wx_code: {
            type: STRING(1000),
            comment: '微信二维码',
        },
        shop_code: {
            type: STRING(1000),
            comment: '商城二维码',
        },
        qq: {
            type: STRING(20),
            comment: 'QQ',
        },
        email: {
            type: STRING(50),
            comment: '邮箱',
        },
        profile: {
            type: STRING(2000),
            comment: '公司介绍',
        },
        profile_en: {
            type: STRING(2000),
            comment: '公司介绍',
        },
        corporate_culture: {
            type: STRING(2000),
            comment: '企业文化',
        },
        corporate_culture_en: {
            type: STRING(2000),
            comment: '企业文化',
        },
        corporate_culture_image: {
            type: STRING(1000),
            comment: '企业文化背景图片地址',
        },
        description: {
            type: STRING(1000),
            comment: '描述',
        },
        description_en: {
            type: STRING(1000),
            comment: '英文描述',
        },
        establish_date: {
            type: STRING(50),
            comment: '成立日期',
        },
        service_province: {
            type: STRING(50),
            comment: '省市自治区的产品和服务覆盖',
        },
        service_office: {
            type: STRING(50),
            comment: '办事处多年行业经验技术团队',
        },
        seo_keyword: {
            type: STRING(200),
            comment: 'SEO关键字',
        },
        seo_description: {
            type: STRING(255),
            comment: 'SEO描述',
        },
        logo: {
            type: STRING(1000),
            comment: '公司logo图片地址',
        },
        logo_mobile: {
            type: STRING(1000),
            comment: '公司logo图片地址- 手机端',
        },
        worth: {
            type: STRING(255),
            comment: '以客户为中心，以奋斗者为本',
        },
        worth_en: {
            type: STRING(255),
            comment: '以客户为中心，以奋斗者为本',
        },
        service_pre_sales_technical_team_tel: {
            type: STRING(30),
            comment: '售前技术团队电话',
        },
        service_after_sales_technical_team_tel: {
            type: STRING(30),
            comment: '售后技术团队电话',
        },
        record: {
            type: STRING(100),
            comment: '备案号',
        },
        honor: {
            type: STRING(1000),
            comment: '荣誉图片',
        },

    }, {
        comment: '菜单表', // 数据库表描述
    });


    // Table.sync({ alter: true }); // 修改表结构或创建表
    return Table;
};
