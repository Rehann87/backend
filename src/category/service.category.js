const Category = require('./model.category');
const { trace } = require('./routes.category');
const categoryService = {};

//add Category
categoryService.addCategory = async ({categoryName}) => {  
    return await Category.create({categoryName});
};

//find by categoryName
categoryService.findByCategoryName = async (categoryName) =>{
    return await Category.findOne(categoryName)
}

//get single category
categoryService.getSingleCategory = async (Id,updateData) =>{
return await Category.findOneAndUpdate(
    { _id: Id, isDeleted: { $ne: true } },
    updateData,
    {
      new: true,
    }
  );
};

// Get Category by ID
categoryService.getCategoryById = async (id) => {
    return await Category.findById(id);
  };

//get category name
categoryService.getCategoryByName = async (categoryName) => {
    const catogryName = await Category.findOne({ categoryName })
    return catogryName
}

//get categories service
categoryService.getAllCategories = async () =>{
    return await Category.find({ isDeleted: { $ne: true } })
}

//Update category service
categoryService.updateCategory = async (categoryId, updateData) => {
    if(!categoryId){
            throw new Error('Category Id is required')
           }
    return await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
  };

//Delete Category Service
categoryService.deleteCategory = async(categoryId, deleteData) =>{
    if(!categoryId){
        throw new Error('Category Id is required')
    }
    return await Category.findByIdAndUpdate(categoryId, deleteData, {new : true});
}

module.exports = categoryService

