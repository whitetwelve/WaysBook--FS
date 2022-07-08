const { book, user } = require('../../models')

exports.getBooks = async (req, res) => {
    try {
        let data = await book.findAll({
            include: [
                {
                model : user,
                as    : "user",
                attributes: {
                    exclude: [ "createdAt" , "updatedAt", "password" ]
            }
                },
        ],
            attributes : {
                exclude : [ 'createdAt' , 'updatedAt' , 'idUser' ]
            }
        })
        data = data.map((item) => {
            item.thumbnail = 'http://localhost:5000/uploads/' + item.thumbnail,
            item.bookAttachment = 'http://localhost:5000/uploadsFile/' + item.bookAttachment

            return item
        })
        
        if(data < 1) {
            return res.send({
                message : "Data buku kosong!"
            })
        }

        res.send({
            status  : 'Success!',
            message : "Data Buku berhasil ditampilkan!",
            data
        })

    } catch (error) {
        console.log(error)

        res.send({
            status  : 'failed',
            message : 'Server Error'
        })
    }
}

exports.getDetailBook = async (req, res) => {
    try {
        const id   = req.params.id

        let data = await book.findOne({
            where : {
                id
            },
            attributes  : {
                exclude : [ 'createdAt' , 'updatedAt' , 'idUser' ]
            }
        })

        if(data <= 1){
            return res.send({
                message : `Buku dengan id ${id} tidak ditemukan!`
            })
        }
        res.send({
            status  : 'Success!',
            message : `Data produk id :${id} berhasil ditampilkan!`,
            data
        })
    } catch (error) {
        console.log(error)
        
        res.send({
            status  : 'failed',
            message : 'Server Error'
        })
    }
}

exports.addBook = async (req, res) => {
    try {
        
        const data = await book.create({
            ...req.body,
            bookAttachment : req.files["bookAttachment"][0].filename,
            thumbnail : req.files["thumbnail"][0].filename
        })
        res.send({
            status  : 'Success!',
            message : 'Data buku berhasil ditambahkan!',
            data
        })

    } catch (error) {
        console.log(error)

        res.status(500).send({
            status  : 'failed',
            message : 'Server Error'
        })
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const id = req.params.id

        const data = await book.findOne({
            where : {
                id
            }
        })

        if(!data){
            return res.send({
                message:`Buku dengan id ${id} tidak ditemukan!`
            })
        }

        await book.destroy({
            where : {
                id
            }
        })

        res.send({
            status  : 'Success',
            message : `Buku dengan id ${id} berhasil dihapus!`
        })

    } catch (error) {
        console.log(error)
        res.send({
            status  : 'error',
            message : 'Server error!'
        })
    }
}

exports.updateBook= async (req, res) => {
    try {
        const id = req.params.id
        
        let data = await book.findOne({
            where : {
                id
            },
            attributes  : {
                exclude : [ 'createdAt' , 'updatedAt' , 'idUser' ]
            }
        })

        if(data == null){
            return res.send({ message : `Buku dengan id ${id} tidak ditemukan!!`})
        }
        console.log(data);
        await book.update(req.body, {
            where : {
                id
            }
        })

        res.send({
            status  : "success",
            message : `Update data buku dengan id : ${id} berhasil!`,
            data
        })
    } catch (error) {
        console.log(error)

        res.send({
            status  : "failed",
            message : "Server Error"
        })
    }
}

