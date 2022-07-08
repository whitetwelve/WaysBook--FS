// IMPORT PACKAGE 
const jwt = require('jsonwebtoken')


exports.auth = (req, res, next) => {

    const authHeader = req.header('Authorization')

    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.send({

            status  : 'failed',
            message : 'Akses ditolak! Harap input token terlebih dahulu ..'

        })
    }

    try {

        const verified = jwt.verify(token, 'PengenTauYa?')

        req.user = verified

        next()

    } catch (error) {

        res.send({

            status: 'failed',
            message: 'Token tidak valid!'

        })
    }
}