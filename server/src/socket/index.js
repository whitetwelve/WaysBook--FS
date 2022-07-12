// MODELS
const { chat, user, profiles } = require('../../models')

const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')
require('dotenv').config()
let connectedUser = {}

const socketIo = (io) => {
    // MIDDLEWARE VALIDASI TOKEN
    // io.use((socket, next) => {
    //     if (socket.handshake.auth && socket.handshake.auth.token) {
    //         next();
    //     } else {
    //         next(new Error("Please send a token!"));
    //     }
    // });


    io.on('connection', (socket) => {
        console.log('client connect', socket.id);

        // GET ID USER
        const userId = socket.handshake.query.id
        connectedUser[userId] = socket.id


        socket.on("load admin contact", async () => {
            try {
                const adminContact = await user.findOne({
                    where: {
                        status: "admin"
                },
                    include: [
                        {
                        model: profiles,
                        as: "profile",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    },
                    {
                        model       : chat,
                        as          : 'senderMessage',
                        attributes  : {
                            exclude : ['createdAt', 'updatedAt', 'idSender', 'idRecipient']
                        }
                    },
                    {
                        model       : chat,
                        as          : 'recipientMessage',
                        attributes  : {
                            exclude : ['createdAt', 'updatedAt', 'idSender', 'idRecipient']
                        }
                    }
                    ],
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            });

            // emit event to send admin data on event “admin contact”
            socket.emit("admin contact", adminContact)
            } catch (err) {
            console.log(err)
            }
        })

        socket.on("load customer contacts", async () => {
            try {
                let customerContacts = await user.findAll({
                    where: {
                        status: "Customer"
                },
                include: [
                    {
                        model: profiles,
                        as: "profile",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "idUser"],
                        },
                    },
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            });

        // customerContacts = JSON.parse(JSON.stringify(customerContacts))
        // customerContacts = customerContacts.map((item) => ({
        //     ...item,
        //     avatar : item.profile.avatar ?
        //     "http://localhost:5000/uploadsImg/" + item.profile?.avatar
        //     : null
        // }))
        console.log(customerContacts);
            socket.emit("customer contacts", customerContacts)
            } catch (err) {
            console.log(err)
            }
        })

        socket.on("load messages", async (payload) => {
            try {
                const token = socket.handshake.auth.token

                const tokenKey = process.env.TOKEN_KEY;
                const verified = jwt.verify(token, tokenKey);

                const idRecipient = payload; // menangkap data id dari client
                const idSender = verified
                console.log(idSender);
                const data = await chat.findAll({
                    where: {
                        idSender: {
                            [Op.or]: [idRecipient, idSender],
                        },
                        idRecipient: {
                            [Op.or]: [idRecipient, idSender],
                        },
                    },
                    include: [
                        {
                        model: user,
                        as: "recipient",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "password"],
                        },
                        },
                        {
                        model: user,
                        as: "sender",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "password"],
                        },
                        },
                    ],
                    order: [["createdAt", "ASC"]],
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
                    },
                });
        socket.emit("messages", data);
            } catch (error) {
                console.log(error);
            }
        })

        socket.on("send message", async (payload) => {
            try {
                const token = socket.handshake.auth.token

                const tokenKey = process.env.TOKEN_KEY
                const verified = jwt.verify(token, tokenKey)
                const idSender = verified
                console.log(idSender);
                const { message, idRecipient } = payload;

                await chat.create({
                    message,
                    idRecipient,
                    idSender
                })

                // BROADCAST SENDER AND RECEIVER
                io.to(socket.id).to(connectedUser[idRecipient]).
                emit("new message", idRecipient)
            } catch (error) {
                console.log(error);
                // DELETE ID WHEN DISCONNECTED
            }
        })


        socket.on('disconnect', () => {
            console.log('client disconnect', socket.id);
            })
        })
}

module.exports = socketIo