const { user, profile } = require('../../models') 


exports.getUsers = async (req ,res) => {
    try {
        const data = await user.findAll({
            include : {
                model : profile,
                as : 'profile'
            },
            attributes : {
                exclude : [ "password", "createdAt", "updatedAt" ]
            }
        })

        res.send({
            status : "Success",
            message : "Data berhasil ditampilkan!",
            data
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            status : 'failed',
            message : 'Server Error'
        })
    }
}

exports.addUsers = async (req, res) => {
    try {
        await user.create(req. body)

        res.send({
            status : "Success",
            message : "Data user berhasil ditambahkan!"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status : 'failed',
            message : "Server Error"
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params
        
        const data = await user.findOne({
            where : {
                id
            },
            attributes : {
                exclude : [ 'password' , 'createdAt' , 'updatedAt' ]
            }
        })
        
        if(data < 1){
            return res.send({
                message : `data user dengan id ${id} tidak ada!`
            })
        }
        res.send({
            status  : "success",
            message : `Data user dengan id : ${id} berhasil ditampilkan!`,
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

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        
        const newData = req.body

        const data = await user.findOne({
            where : {
                id
            }
        })

        if(!data){
            return res.send({
                message : `id ${id} tidak ditemukan!`
            })
        }

        await user.update(newData, {
            where : {
                id
            },
            attributes : {
                exclude : [ 'password' , 'createdAt' , 'updatedAt' ]
            }
        })


        res.send({
            status  : "success",
            message : `Update data user dengan id : ${id} berhasil!`,
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

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const data = await user.findOne({
            where : {
                id
            }
        })

        if(!data){
            return res.send({
                message : `User data dengan id : ${id} tidak ditemukan!`
            })
        }

        await user.destroy({
            where : {
                id
            }
        })

        res.send({
            status  : 'success',
            message : `Data user dengan id: ${id} berhasil dihapus!`
        })

    } catch (error) {
        console.log(error)

        res.send({
            status  : 'failed',
            message : 'Server Error'
        })
    }
}

exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params

        const data = await profile.findOne({
            where: {
                id
            },
            attributes : {
                exclude : [ "createdAt" , "updatedAt"]
            },
            include: {
                model: user,
                as: 'Data User',
                    attributes : {
                        exclude : [ "createdAt" , "updatedAt", "password"]
                }
            }
        })

        if(data == null || data < 1){
            return res.send({message : `Data profile dengan id ${id} tidak ditemukan!`})
        }
        res.send({
            status: 'success',
            message:`data profile dengan id: ${id} berhasil ditampilkan!`,
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

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params
        
        const newData = req.body

        const data = await profile.findOne({
            where : {
                id
            },
            attributes : {
                exclude : [ "createdAt" , "updatedAt"]
            }
        })

        if(!data){
            return res.send({
                message : `id ${id} tidak ditemukan!`
            })
        }

        await profile.update(newData, {
            where : {
                id
            },
            attributes : {
                exclude : [ 'password' , 'createdAt' , 'updatedAt' ]
            }
        })


        res.send({
            status  : "success",
            message : `Update data user dengan id : ${id} berhasil!`,
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

exports.addProfile = async (req, res) => {
    try {

        let datas = req.body

        const data = await profile.create({
            ...datas,
            image : req.file?.filename
        })


        res.send({
            status  : 'Success!',
            message : 'Data profile berhasil ditambahkan!',
            data
        })

    } catch (error) {
        console.log(error)

        res.status(404).send({
            status  : 'failed',
            message : 'Server Error'
        })
    }
}

exports.getProfiles = async (req, res) => {
    try {

        let data = await profile.findAll({
            include : [
                {
                model : user,
                as    : "Data User",
                attributes : {
                    exclude : [ "createdAt" , "updatedAt", "password" ]
                }
            }
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
                message : "Data profile kosong!"
            })
        }

        res.send({
            status  : 'Success!',
            message : "Data profiles berhasil ditampilkan!",
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

exports.deleteProfile = async (req, res) => {
    try {
        const { id } = req.params

        const data = await profile.findOne({
            where : {
                id
            }
        })

        if(!data){
            return res.send({
                message : `Profile data dengan id ${id} tidak ditemukan!`
            })
        }

        await profile.destroy({
            where : {
                id
            }
        })

        res.send({
            status  : 'success',
            message : `Profile data dengan id ${id} berhasil dihapus!`
        })

    } catch (error) {
        console.log(error)

        res.send({
            status  : 'failed',
            message : 'Server Error'
        })
    }
}