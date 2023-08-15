import { Controller } from 'egg';
// import * as fs from 'fs';

export default class UploadPictureController extends Controller {
    // async index() {
    //     await this.ctx.render('home/upload.tpl', {});
    // }
    // async upload() {
    //     console.log(this.ctx.request);
    //     const file = this.ctx.request.files[0];
    //     console.log('file :>> ', file);
    //     const name = file.filename;
    //     const dist = 'app/public/upload/' + name;
    //     const result = await new Promise((resolve, reject) => {
    //         fs.promises.copyFile(file.filepath, dist, (error: any) => {
    //             if (error) {
    //                 reject(error);
    //                 console.log('fail');
    //             } else {
    //                 resolve(true);
    //                 console.log('success');
    //             }
    //         });
    //     });
    //     this.ctx.response.body = {
    //         state: result,
    //         filename: name,
    //     };
    // }

    // async create() {
    //     // 获取文件流
    //     const stream = await this.ctx.getFileStream();
    //     // 定义文件名
    //     const filename = Date.now() + path.extname(stream.filename).toLocaleLowerCase();
    //     // 目标文件
    //     const target = path.join('app/public/uploads', filename);
    //     //
    //     const writeStream = fs.createWriteStream(target);
    //     console.log('-----------获取表单中其它数据 start--------------');
    //     console.log(stream.fields);
    //     console.log('-----------获取表单中其它数据 end--------------');
    //     try {
    //         //异步把文件流 写入
    //         await awaitWriteStream(stream.pipe(writeStream));
    //     } catch (err) {
    //         //如果出现错误，关闭管道
    //         await sendToWormhole(stream);
    //         // 自定义方法
    //         this.error(err);
    //     }
    //     // 自定义方法
    //     this.success({ url: '/public/uploads/' + filename });
    // }

}

