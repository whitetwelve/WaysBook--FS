// IMPORT PACKAGES
const express = require("express")

const router  = express.Router()


// CONTROLLERS
const { getUsers, getProfiles, getProfile, addUsers, getUser, updateUser, deleteUser, updateProfile, deleteProfile, addProfile } = require("../controllers/user")
const { getBooks, getDetailBook, updateBook, deleteBook, addBook } = require('../controllers/book')
const { getPromoBooks, addPromoBook, deletePromoBook} = require("../controllers/promoBooks")
const { getTransactions, addTransaction, deleteTransaction} = require("../controllers/transaction")
const { addCart, getCart, deleteCart } = require("../controllers/cart")
const { register, login, checkAuth} = require("../controllers/auth")

// MIDDLEWARE
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')
const { uploadFileProfile, uploadFileAttachment } = require('../middlewares/uploadImg')


// ROUTES FOR USER
router.get("/users", getUsers)
router.post("/user", addUsers)
router.get("/user/:id", getUser)
router.patch("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)


// ROUTES FOR PROFILE
router.get("/profile/:id", auth, getProfile)
router.get("/profiles", auth, getProfiles)
router.patch("/profile/:id", updateProfile)
router.post("/profile", uploadFileProfile('avatar'), addProfile)
router.delete("/profile/:id", deleteProfile)


// ROUTES FOR BOOKS
router.get("/books", getBooks)
router.get("/book/:id", auth, getDetailBook)
router.post("/books", auth, uploadFile('thumbnail', 'bookAttachment'), addBook)
router.patch("/book/:id", updateBook)
router.delete("/book/:id", deleteBook)


// ROUTES FOR PROMO BOOKS
router.get("/promo-books", getPromoBooks)
router.post("/promo-book", addPromoBook)
router.delete("/promo-book/:id", deletePromoBook)


// ROUTES FOR TRANSACTION
router.get("/transactions", auth , getTransactions)
router.post("/transaction", uploadFileAttachment('attachment'), addTransaction)
router.delete("/transaction/:id", deleteTransaction)


// ROUTES FOR CART
router.get("/carts", auth, getCart)
router.post("/cart", uploadFileAttachment('attachment'), addCart)
router.delete("/cart/:id", deleteCart)

// ROUTE FOR AUTH
router.post("/register" , register)
router.post("/login" , login)
router.get("/auth" , auth , checkAuth)

module.exports = router