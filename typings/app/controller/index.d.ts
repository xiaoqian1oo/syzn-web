// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportBanner from '../../../app/controller/banner';
import ExportBase from '../../../app/controller/base';
import ExportCom from '../../../app/controller/com';
import ExportCommon from '../../../app/controller/common';
import ExportCompany from '../../../app/controller/company';
import ExportFile from '../../../app/controller/file';
import ExportGoods from '../../../app/controller/goods';
import ExportHome from '../../../app/controller/home';
import ExportMenu from '../../../app/controller/menu';
import ExportNews from '../../../app/controller/news';
import ExportUpload from '../../../app/controller/upload';
import ExportUser from '../../../app/controller/user';
import ExportVideo from '../../../app/controller/video';
import ExportWeb from '../../../app/controller/web';

declare module 'egg' {
  interface IController {
    banner: ExportBanner;
    base: ExportBase;
    com: ExportCom;
    common: ExportCommon;
    company: ExportCompany;
    file: ExportFile;
    goods: ExportGoods;
    home: ExportHome;
    menu: ExportMenu;
    news: ExportNews;
    upload: ExportUpload;
    user: ExportUser;
    video: ExportVideo;
    web: ExportWeb;
  }
}
