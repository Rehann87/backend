const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const transactionService = require('./service.transaction');
const modelTransaction = require('./model.transaction');


const transactionController = {};
const validTransactionTypes = ["income", "expense"]

//Add the transaction
transactionController.addTransaction = async (req, res) => {
  const { categoryId, amount, type, date, remark } = req.body;

  //required type and date !
  if (categoryId == '' || type == '' || date == '') {
    return res.send({ status: false, msg: "categoryId ,Type, date is required", data: null })
  }

  //required amount !
  if (amount == undefined || amount == '') {
    return res.send({ status: false, msg: "Amount is required.", data: null })
  }

  //invalid amount check !
  if (amount <= 0) {
    return res.send({ status: false, msg: "invalid amount value", data: null })
  }

  //invalid transaction check !
  if (!validTransactionTypes.includes(type)) {
    return res.send({ status: false, msg: "invalid transaction type", data: null })
  }

  // Transaction servicess
  const transaction = await transactionService.findByTransactionByAmount({ amount })

  // Check if the category already exists
  if (transaction) {
    res.send({ status: false, msg: "Transaction already exist", data: null })
  } else {
    try {
      const newTransaction = await transactionService.addTransaction({ categoryId, amount, type, date, remark })

      return res.send({ status: true, msg: "Transaction Created Successfully", data: newTransaction })

    } catch (err) {
      console.log(err)
      return res.send({ status: false, msg: "something went wrong", data: null })
    }
  }
}

//get All the transactions
transactionController.getAllTransaction = async (req, res) => {
  try {
    const getTransaction = await transactionService.getAllTransaction()
    console.log(getTransaction, "Working")
    if (getTransaction.length) {
      return res.send({ status: true, data: getTransaction, error: null })
    } else {
      return res.send({ status: false, data: null, error: err })
    }
  } catch (err) {
    res.send({ status: false, data: null, error: err })
  }
}

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
