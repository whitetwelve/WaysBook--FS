const { cart, book, transactions } = require("../../models")

exports.addCart = async (req, res) => {
    try {
    
        const newCart = await cart.create({
            ...req.body
        });
    
        // get cart
        let cartExist = await cart.findOne({
            where: {
                id: newCart.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
    
        cartExist = JSON.parse(JSON.stringify(cartExist));
    
        // response
        res.status(200).send({
            status: "Success",
            message: "Buku berhasil ditambahkan di cart anda!",
            data: cartExist,
        });
        } catch (error) {
        console.log(error);
        req.send({
            status : "failed",
            message : "Server Error"
        })
    }
}

exports.getCart = async (req, res) => {
    try {

        const data = await cart.findAll({
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