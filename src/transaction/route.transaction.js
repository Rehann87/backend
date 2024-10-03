const router = require("express").Router()
const transactionController = require("./controller.transaction")

router.post("/add-transaction", transactionController.addTransaction);
router.get("/get-transaction", transactionController.getAllTransaction);
router.patch("/update-transaction/:transactionId", transactionController.updatedTransaction);
router.delete("/delete-transaction/:transactionId", transactionController.deletedTransaction)




module.exports = router