import { Controller } from 'egg';
// import fs from 'fs';
// import pump from 'pump';

export default class CommonsController extends Controller {


    //     /**
    //      * @summary 文件上传
    //      * @description formData 案例
    //      * @router post /upload
    //      ** @request formData file *file
    //      * @response 200 testResponse
    //      * @apikey
    //      */
    //     async upload() {
    //         const { ctx, service } = this
    //         const File = this.ctx.model.File

    //         const parts = ctx.multipart({
    //             autoFields: true
    //         })

    //         let dir, stream, files = {}
    //         while ((stream = await parts()) != null) {
    //             if (!stream.filename) {
    //                 break
    //             }
    //             const fieldname = stream.fieldname // file表单的名字
    //             // 上传图片的目录
    //             dir = await service.toolService.getUploadFile(stream.filename)
    //             const target = dir.uploadDir
    //             const writeStream = fs.createWriteStream(target)
    //             await pump(stream, writeStream)
    //             files = Object.assign(files, {
    //                 [fieldname]: dir.saveDir
    //             })
    //         }
    //         if (Object.keys(files).length > 0) {
    //             const data = await File.create({ link: dir.saveDir })
    //             ctx.body = {
    //                 code: 200,
    //                 message: '文件上传成功',
    //                 data
    //             }
    //         } else {
    //             ctx.throw(422, '文件上传失败')
    //         }
    //     }

    //     /**
    //      * @summary 删除文件
    //      * @router post /deleteFile
    //      * @request body deleteFile
    //      * @response 200 testResponse
    //      * @apikey
    //      */
    //     async delete() {
    //         const { ctx, service } = this
    //         const File = this.ctx.model.File
    //         const body = ctx.request.body
    //         ctx.validate({
    //             id: { type: 'string' }
    //         })
    //         const _data = await File.findById(body.id)
    //         if (!_data) {
    //             ctx.throw(422, '_id不正确！')
    //         }
    //         _data.remove()
    //         service.toolService.deleteDiskFile(_data.link)
    //         ctx.body = {
    //             code: 200,
    //             message: '删除成功'
    //         }
    //     }
}
