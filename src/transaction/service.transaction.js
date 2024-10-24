const modelTransaction = require('./model.transaction');

const transactionService = {};

// Add transaction
transactionService.addTransaction = async ({
  amount,
  date,
  type,
  account,
  categoryId,
  necessary,
  remark,
  userId,
}) => {
  return await modelTransaction.create({
    amount,
    date,
    type,
    account,
    categoryId,
    remark,
  });
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
  try {
    // Fetch transactions where isDeleted is not true, and populate categoryId with only CategoryName field
    const transactions = await modelTransaction.find({ isDeleted: { $ne: true } })
      .populate("categoryId", "categoryName");

    // Return the transactions
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions from DB:", error); // Log the error for debugging
    throw new Error("Unable to retrieve transactions"); // Throw a meaningful error
  }
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
