
import * as fs from 'fs';
import * as path from 'path';
import { Controller } from 'egg';
import moment from 'moment';
import mkdirp from 'mkdirp';


export default class CommonController extends Controller {

    async upload() {
        const { ctx } = this;

        const parts = ctx.multipart();
        let part;
        let files = {};
        while ((part = await parts()) != null) {
            if (part.length) {
                // 处理其他参数
                // console.log('field: ' + part[0]);
                // console.log('value: ' + part[1]);
                // console.log('valueTruncated: ' + part[2]);
                // console.log('fieldnameTruncated: ' + part[3]);
            } else {
                // console.log('part :>> ', part);
                if (!part.filename) {
                    continue;
                }
                // otherwise, it's a stream
                // console.log('field: ' + part.fieldname);
                // console.log('filename: ' + part.filename);
                // console.log('encoding: ' + part.encoding);
                // console.log('mime: ' + part.mime);

                // 上传图片的目录
                const dir = await this.getUploadFile(part.filename);
                // console.log('dir :>> ', dir);
                const writePath = dir.uploadDir; // 文件写入的地址
                // console.log('writePath :>> ', writePath);

                const writeStream = fs.createWriteStream(writePath);
                await part.pipe(writeStream);

                files = Object.assign(files, {
                    [part.fieldname]: dir.saveDir,
                });
            }
        }
        // console.log('files :>> ', files);

        if (Object.keys(files).length > 0) {
            // const data = await File.create({ link: dir.saveDir });
            ctx.body = {
                code: 200,
                message: '文件上传成功',
                data: files,
            };
        } else {
            ctx.throw(422, '文件上传失败');
        }

    }


    /**
     * 获取文件上传目录
     * @param {string} filename 上传的文件名
     */
    async getUploadFile(filename: string) {
        // 1.获取当前日期
        const day = moment(new Date()).format('YYYYMMDD');
        // const day = sd.format(new Date(), 'YYYYMMDD');
        // 2.创建图片保存的路径
        const dir = path.join(this.config.uploadDir, day);
        await mkdirp(dir); // 不存在就创建目录
        const date = Date.now(); // 毫秒数
        const suffix = path.extname(filename);
        const _filename = filename.split(suffix)[0];
        const shortFilename = _filename.slice(0, 10); // 只保留前面10位
        // 返回图片保存的路径
        const uploadDir = path.join(dir, shortFilename + '-' + date + suffix);


        let imgDomain = this.config.imgDomain;
        // 判断图片主机地址最后面是否有“/”,有就去掉
        if (imgDomain.charAt(imgDomain.length - 1) === '/') {
            imgDomain = imgDomain.slice(0, -1);
        }


        return {
            filename: date + suffix,
            uploadDir,
            saveDir: imgDomain + uploadDir.slice(3).replace(/\\/g, '/'),
        };
    }


    /**
     * 删除磁盘文件
     * @param {*} url
     */
    public deleteDiskFile(url: string) {
        let imgDomain = this.config.imgDomain;
        // 判断图片主机地址最后面是否有“/”,有就去掉
        if (imgDomain.charAt(imgDomain.length - 1) === '/') {
            imgDomain = imgDomain.slice(0, -1);
        }
        const filePath = url.split(imgDomain)[1];
        try {
            fs.unlinkSync(path.join(process.cwd(), '/app' + filePath));
        } catch (error) {
            // throw error(error)
        }
    }

}
