const { user, transactions, book } = require('../../models')

exports.getTransactions = async (req, res) => {
    try {

        const data = await transactions.findAll({
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
        console.log(data);

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
        const data = req.body

        await transactions.create(data)

        res.send({
            status  : 'success',
            message : 'Data transaksi berhasil ditambahkan!'
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