const { cart, book, transactions, simplycart, profiles } = require("../../models")

exports.addCart = async (req, res) => {
    try {
    
        const data = await cart.create({
            ...req.body,
            attachment : req.files["attachment"][0].filename
        });

        // response
        res.status(200).send({
            status: "Success",
            message: "Buku berhasil ditambahkan di cart anda!",
            data
        });
        } catch (error) {
        console.log(error);
        res.send({
            status : "failed",
            message : "Server Error"
        })
    }
}

exports.getCart = async (req, res) => {
    try {

        let data = await cart.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: book,
                    as: 'book',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: transactions,
                    as: 'transactions',
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
        
        if(data < 1) {
            return res.send({
                pesan : "Cartnya kosong, isi dulu ya .."
            })
        }

        res.send({
            status: 'success',
            message : 'Cart berhasil ditampilkan!',
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

exports.deleteCart = async (req, res) => {
    try {
        const id = req.params.id

        const data = await cart.findOne({
            where : {
                id
            }
        })

        if(!data){
            return res.send({
                message :`Cart dengan id ${id} tidak ditemukan!`
            })
        }

        await cart.destroy({
            where : {
                id
            }
        })

        res.send({
            status  : 'Success',
            message : `Cart dengan id ${id} berhasil dihapus!`
        })

    } catch (error) {
        console.log(error)
        
        res.send({
            status  : 'error',
            message : 'Server error!'
        })
    }
}

exports.addSimplyCart = async (req, res) => {
    try {
    
        const data = await simplycart.create({
            ...req.body,
        });

        // response
        res.status(200).send({
            status: "Success",
            message: "Buku berhasil ditambahkan di cart anda!",
            data
        });
        } catch (error) {
        console.log(error);
        res.send({
            status : "failed",
            message : "Server Error"
        })
    }
}

exports.getSimplyCart = async (req, res) => {
    try {
        const { id } = req.params
        let data = await simplycart.findOne({
            where : {
                id
            },  
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include     : [
                {
                model       : profiles,
                as          : 'profile',
                attributes  : {
                    exclude : ['createdAt', 'updatedAt']
                    }
                },
                {
                model       : book,
                as          : 'books',
                attributes  : {
                    exclude : ['createdAt', 'updatedAt']
                    }
                }
            ],
        })

        
        if(data < 1) {
            return res.send({
                pesan : "Cartnya kosong, isi dulu ya .."
            })
        }

        res.send({
            status: 'success',
            message : 'Cart berhasil ditampilkan!',
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