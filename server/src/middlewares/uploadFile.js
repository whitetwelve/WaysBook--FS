// IMPORT PACKAGE
const multer = require('multer')


exports.uploadFile = (imageFile) => {

    const storage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, 'uploads')
        },
        fileName : (req, file, cb) => {
            cb(null, Date.now() + '-'+ file.originalname.replace(/\s/g, ""));
        }
    })


const fileFilter = function(req, file, cb) {

    if(file.fieldname === imageFile){
        if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|WEBP|webp|jfif|JFIF|PDF|pdf|doc|docx)$/)){
            req.fileValidationError = {
                message : 'Tipe file tidak sesuai, harap diulang kembali!'
                }
        
                return cb(new Error("Tipe file tidak sesuai, harap diulang kembali!"), false)
            }
        }
    cb(null , true)
}


//SIZING UPLOADS
const maxSizeUpload = 5 * 1000 * 1000 * 1000
const limits = {

    fileSize : maxSizeUpload

}

const upload = multer({
    storage,
    fileFilter,
    limits
}).single(imageFile)


return (req, res, next) => {
    upload(req, res, (err) => {


        // Filter
        if(req.fileValidationError){
            return res.send(req.fileValidationError)
        }


        // Pengkondisian File empty
        if(!req.file && !err){    
            return res.send({
                message : 'Gambar kosong, harap upload gambar!'
            })
        }


        // Limit File Upload
        if(err){
            console.log(err);
            if(err.code == "LIMIT_FILE_SIZE"){
                return res.send({
                    message : 'Ukuran file terlalu besar!'
                    })
                }

                return res.send(err)
            }

            return next()
        })
    }
}