const { book, promoBook } = require('../../models')

exports.getPromoBooks = async (req, res) => {
    try {
        let data = await promoBook.findAll({
            include: [
                {
                model : book,
                as    : "book",
                attributes: {
                    exclude: [ "createdAt" , "updatedAt" ]
            }
                },
        ],
            attributes : {
                exclude : [ 'createdAt' , 'updatedAt' , 'idUser' ]
            }
        })

        data = data.map((item) => {
            item.image = 'http://localhost:5000/uploads/' + item.image

            return item
        })

        if(data < 1) {
            return res.send({
                message : "Data promo book kosong!"
            })
        }
        
        res.send({
            status  : 'Success!',
            message : "Data Buku berhasil ditampilkan!",
            promoBoook : data
        })

    } catch (error) {
        console.log(error)

        res.send({
            status  : 'failed',
            message : 'Server Error'
        })
    }
}

exports.addPromoBook = async (req, res) => {
    try {
        const data = await promoBook.create({
            ...req.body
        })

        res.send({
            status  : 'Success!',
            message : 'Promo book berhasil ditambahkan!',
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

exports.deletePromoBook = async (req, res) => {
    try {
        const id = req.params.id

        const data = await promoBook.findOne({
            where : {
                id
            }
        })

        if(!data){
            return res.send({
                message:`Buku dengan id ${id} tidak ditemukan!`
            })
        }

        await promoBook.destroy({
            where : {
                id
            }
        })

        res.send({
            status  : 'Success',
            message : `Promo buku dengan id ${id} berhasil dihapus!`
        })

    } catch (error) {
        console.log(error)
        res.send({
            status  : 'error',
            message : 'Server error!'
        })
    }
}