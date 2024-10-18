const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date:{
        type:String,
        required:true
    },
    remark: {
        type: String,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Transactions', transactionSchema);
