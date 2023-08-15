// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportClassify from '../../../app/model/classify';
import ExportCompany from '../../../app/model/company';
import ExportFile from '../../../app/model/file';
import ExportGoods from '../../../app/model/goods';
import ExportGoodsImage from '../../../app/model/goods_image';
import ExportHomeImage from '../../../app/model/home_image';
import ExportMenu from '../../../app/model/menu';
import ExportNews from '../../../app/model/news';
import ExportUser from '../../../app/model/user';
import ExportVideo from '../../../app/model/video';

declare module 'egg' {
  interface IModel {
    Classify: ReturnType<typeof ExportClassify>;
    Company: ReturnType<typeof ExportCompany>;
    File: ReturnType<typeof ExportFile>;
    Goods: ReturnType<typeof ExportGoods>;
    GoodsImage: ReturnType<typeof ExportGoodsImage>;
    HomeImage: ReturnType<typeof ExportHomeImage>;
    Menu: ReturnType<typeof ExportMenu>;
    News: ReturnType<typeof ExportNews>;
    User: ReturnType<typeof ExportUser>;
    Video: ReturnType<typeof ExportVideo>;
  }
}
