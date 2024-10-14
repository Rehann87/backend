const userRoute = require("./src/user/routes.user")
const router = require("express").Router()
const transactionRoute = require('./src/transaction/route.transaction')
const categoryRoute = require('./src/category/routes.category')

router.use("/admin", userRoute)
router.use("/transaction", transactionRoute )
router.use("/category", categoryRoute)

module.exports = router