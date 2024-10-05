const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const categoryService = require('./service.category');


const categoryController = {};


// Add category
categoryController.addCategory = async (req, res) => {
    const { categoryName } = req.body;
    // Validate that categoryName only contains alphabets


    const category = await categoryService.findByCategoryName({ categoryName })
    console.log(category, "category")

    // Check if the category already exists
    if (category) {
        res.send({ status: false, msg: "category already exist", data: null })
    }
    try {
        const alphabetRegex = /^[A-Za-z]+$/;
        if (!alphabetRegex.test(categoryName)) {
            return res.send({ status: false, msg: "Category must contain only alphabets & Character must be filled", data: null });
        }
        const newCategory = await categoryService.addCategory({ categoryName })
        return res.send({ status: true, msg: "Category Created Successfully", data: newCategory })
    } catch (err) {
        console.log(err)
        return res.send({ status: false, msg: "something went wrong", data: null })
    }
}

// get All category
categoryController.getAllCategories = async (req, res) => {
    try {
        const getCategory = await categoryService.getAllCategories()
        console.log(getCategory, "Working")
        if (getCategory.length) {
            return res.send({ status: true, data: getCategory, error: null })
        } else {
            return res.send({ status: false, data: null, error: err })
        }
    } catch (err) {
        res.send({ status: false, data: null, error: err })
    }
}

//get single category
categoryController.getSingleCategory = async (req, res) => {
    try {
        const { Id } = req.params;

        const getSingleData = await categoryService.getSingleCategory(Id);
        console.log(getSingleData, 'getsouu')
        if (!getSingleData) {
            return res.send({
                status: false,
                msg: "No data found",
                data: null,
            });
        } else {
            return res.send({
                status: true,
                msg: "Category retrived sucessfully",
                data: getSingleData,
            });
        }
    } catch (error) {
        return res.send({
            status: false,
            msg: "Something went wrong",
            data: null,
        });
    }
};

//update category
categoryController.updateCategory = async (req, res) => {

    const { categoryId } = req.params;
    const { CategoryName } = req.body;

    const category = await categoryService.updateCategory(categoryId, { CategoryName, });
    
    if (!category) {
        return res.send({ status: "Error", msg: "Category not found", data: null, });
    }
    if (category) {
        try {
            const updateCategory = await categoryService.updateCategory(categoryId, category);
            res.status(200).json({
                status: true,
                message: "Category updated successfully",
                data: updateCategory
            })
        } catch (err) {
            console.log(err)
        }
    } else {
        return res.send({ status: false, msg: "Invalid Category Id", data: null })
    }
}


////delete  Category
categoryController.deleteCategory = async(req, res) =>{
    const {categoryId} = req.params;
    try {
      const deletedCategory = await categoryService.deleteCategory(categoryId, {
        $set: { isDeleted: true },
      });
      res.status(200).json({
        status:true,
        message: "Category deleted successfully",
        data: null
      })
    } catch (err) {
      console.log(err)
    }
  }





module.exports = categoryController
