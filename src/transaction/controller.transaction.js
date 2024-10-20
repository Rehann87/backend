const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const transactionService = require('./service.transaction');
const modelTransaction = require('./model.transaction');


const transactionController = {};
const validTransactionTypes = ["income", "expense"]

//Add the transaction
transactionController.addTransaction = async (req, res) => {
  try {
    const {
      amount,
      date,
      type,
      categoryId,
      remark,
    } = req.body;
    const CategoriesData = await categoryService.getCategoryById(
      categoryId
    );

    // Validate transaction type
    const validTransactionTypes = ["expense", "income"]; // Define the valid transaction types
    if (!validTransactionTypes.includes(type)) {
      return res.send({
        status: false,
        msg: "Invalid transaction type",
        data: null,
      });
    }
    
    const categoryName = CategoriesData?.categoryName;
    // console.log(categoryName,"categoryName")

    const transactionData = await transactionService.addTransaction({
      amount,
      date,
      type,
      categoryId,
      remark,
      userId: req?._id,
    });
    console.log(transactionData)

    const responseData = {
      ...transactionData.toObject(),
     CategoriesData: {
        _id: categoryId, // The original expenseCategory ID
        name: categoryName, // The fetched category name
      },
    };

    return res.send({
      status: "OK",
      msg: "Amount, date, type and remark is created successfully",
      data: responseData,
    });
  } catch (error) {
    console.log(error, "errorerror");
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};

//get All the transactions
transactionController.getAllTransaction = async (req, res) => {
  try {
    // Fetch all transactions from the service
    const transactions = await transactionService.getAllTransaction();
    
    // Log retrieved transactions for debugging
    console.log(transactions, "Transactions retrieved");

    // Map through each transaction and update the structure
    const transactionsWithDetails = transactions.map((transaction) => ({
     
      ...transaction.toObject(), // Convert Mongoose object to plain object if needed
      categoryId: transaction.categoryId?.categoryName || "Unknown", // Replace ID with category name or default to "Unknown"
    }));
    // console.log(transactionsWithDetails[0],"trtatattatta")
    // Return response with successfully retrieved transactions
    return res.send({
      status: "OK",
      msg: "Transactions retrieved successfully",
      length: transactionsWithDetails.length,
      data: transactionsWithDetails,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error); // Log the error for debugging

    // Return response in case of an error
    return res.status(500).send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};

//get single transaction
transactionController.getSingleTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const getSingleData = await transactionService.getSingleTransaction(transactionId);
    console.log(getSingleData, 'getsingleTransaction')
    if (!getSingleData) {
      return res.send({
        status: false,
        msg: "No data found",
        data: null,
      });
    }
    else {
      return res.send({
        status: true,
        msg: "Transaction received sucessfully",
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
}

//Update Transaction
transactionController.updatedTransaction = async (req, res) => {
  const { transactionId } = req.params
  const updateData = req.body;
  const { amount, type, date, remark } = req.body;
  if (type == '' || date == '') {
    return res.send({ status: false, msg: "Type, date is required", data: null })
  }
  if (amount == undefined || amount == '') {
    return res.send({ status: false, msg: "Amount is required.", data: null })
  }
  if (amount <= 0) {
    return res.send({ status: false, msg: "invalid amount value", data: null })
  }

  if (!validTransactionTypes.includes(type)) {
    return res.send({ status: false, msg: "invalid transaction type", data: null })
  }

  const transaction = await transactionService.getTransactionById(transactionId);
  if (transaction) {
    try {
      const updateTransaction = await transactionService.updatedTransaction(transactionId, updateData);
      res.status(200).json({
        status: true,
        message: "Transaction updated successfully",
        data: updateTransaction
      })
    } catch (err) {
      console.log(err)
    }
  } else {
    return res.send({ status: false, msg: "Invalid Transaction", data: null })
  }

}

//delete  Transaction
transactionController.deletedTransaction = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const deleteTransaction = await transactionService.deletedTransaction(transactionId, {
      $set: { isDeleted: true },
    });
    res.status(200).json({
      status: true,
      message: "Transaction deleted successfully",
      data: null
    })
  } catch (err) {
    console.log(err)
  }
}


module.exports = transactionController
