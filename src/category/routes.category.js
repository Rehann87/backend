const router = require("express").Router()
const categoryController = require("./controller.category")

router.post("/add-category", categoryController.addCategory);
router.get("/get-category", categoryController.getAllCategories)
router.patch("/update-category/:categoryId", categoryController.updateCategory);
router.delete("/delete-category/:categoryId", categoryController.deleteCategory);

module.exports = router;
