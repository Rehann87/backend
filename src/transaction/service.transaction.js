const modelTransaction = require('./model.transaction');

const transactionService = {};

// Add transaction
transactionService.addTransaction = async ({ categoryId, amount, type, remark, date }) => {
  return await modelTransaction.create({categoryId, amount, type, remark, date})
};

//findByTransactionByAmount
transactionService.findByTransactionByAmount = async (amount) => {
  return await modelTransaction.findOne(amount)
}

// Get transaction by amount
transactionService.getTransactionByAmount = async (amount) => {
  return await modelTransaction.findOne({ amount });
};

// Get transaction by ID
transactionService.getTransactionById = async (id) => {
  return await modelTransaction.findById(id);
};

// Get all transactions
transactionService.getAllTransaction = async () => {
  return await modelTransaction.find({ isDeleted: { $ne: true } });
};

//get single category
transactionService.getSingleTransaction = async (transactionId, updateData) => {
  return await modelTransaction.findOneAndUpdate(
    { _id: transactionId, isDeleted: { $ne: true } },
    updateData,
    {
      new: true,
    }
  );
};

// Update transaction
transactionService.updatedTransaction = async (transactionId, updateData) => {
  if (!transactionId) {
    throw new Error('Transaction ID is required');
  }

  return await modelTransaction.findByIdAndUpdate(transactionId, updateData, { new: true });
};

// Delete transaction (soft delete)
transactionService.deletedTransaction = async (transactionId, updateField) => {
  return await modelTransaction.findByIdAndUpdate(transactionId, updateField, { new: true });
};

module.exports = transactionService;
