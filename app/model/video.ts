
import { Application } from 'egg';
import { Model, Optional } from 'sequelize';


type UserAttributes = VideoTableType;

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ModelTypeInstances extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export default (app: Application) => {
    const { STRING, INTEGER } = app.Sequelize;


    const table = app.model.define<ModelTypeInstances>('video', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键id' },
        title: {
            type: STRING(80),
            comment: '标题',
        },
        title_en: {
            type: STRING(80),
            comment: '英文标题',
        },
        video_url: {
            type: STRING(1000),
            comment: '视频地址',
        },
        video_image_url: {
            type: STRING(1000),
            comment: '视频封面图片',
        },
        belong_id: {
            type: INTEGER,
            allowNull: false,
            // defaultValue: 2,
            comment: '所属分类id',
        },
        home_recommend: {
            type: INTEGER,
            defaultValue: 2,
            comment: '是否首页推荐 1:是,2:否',
        },
        sort: {
            type: INTEGER,
            defaultValue: 0,
            comment: '排序',
        },
    }, {
        comment: '菜单表', // 数据库表描述
    });


    table.sync({ alter: true }); // 修改表结构或创建表
    return table;
};
