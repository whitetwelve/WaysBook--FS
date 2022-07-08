const { user, transactions, book } = require('../../models')

exports.getTransactions = async (req, res) => {
    try {

        let data = await transactions.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: book,
                    as: 'bookPurchased',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    }
                },
            ]
        })
        
        data = data.map((item) => {
            item.attachment = 'http://localhost:5000/uploadsImg/' + item.attachment
            
            return item
        })

        if(data == 0) {
            return res.send({
                pesan : "data transaksi kosong!"
            })
        }
        res.send({
            status: 'success',
            message : 'Data transaksi berhasil ditampilkan!',
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.addTransaction = async (req, res) => {
    try {
        console.log(req.files);
        const data = await transactions.create({
            ...req.body,
            attachment : req.files["attachment"][0].filename
        })

        res.send({
            status  : 'success',
            message : 'Data transaksi berhasil ditambahkan!',
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

exports.deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id

        const data = await transactions.findOne({
            where : {
                id
            }
        })

        if(!data){
            return res.send({
                message :`Transaksi dengan id ${id} tidak ditemukan!`
            })
        }

        await transactions.destroy({
            where : {
                id
            }
        })

        res.send({
            status  : 'Success',
            message : `Transaksi dengan id ${id} berhasil dihapus!`
        })

    } catch (error) {
        console.log(error)
        
        res.send({
            status  : 'error',
            message : 'Server error!'
        })
    }
}