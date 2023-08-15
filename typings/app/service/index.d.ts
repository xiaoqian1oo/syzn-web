// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBanner from '../../../app/service/Banner';
import ExportCompany from '../../../app/service/Company';
import ExportFile from '../../../app/service/File';
import ExportGoods from '../../../app/service/Goods';
import ExportHome from '../../../app/service/Home';
import ExportMenu from '../../../app/service/Menu';
import ExportNews from '../../../app/service/News';
import ExportUser from '../../../app/service/User';
import ExportVideo from '../../../app/service/Video';

declare module 'egg' {
  interface IService {
    banner: AutoInstanceType<typeof ExportBanner>;
    company: AutoInstanceType<typeof ExportCompany>;
    file: AutoInstanceType<typeof ExportFile>;
    goods: AutoInstanceType<typeof ExportGoods>;
    home: AutoInstanceType<typeof ExportHome>;
    menu: AutoInstanceType<typeof ExportMenu>;
    news: AutoInstanceType<typeof ExportNews>;
    user: AutoInstanceType<typeof ExportUser>;
    video: AutoInstanceType<typeof ExportVideo>;
  }
}
