const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreditCardInfo = mongoose.model('CreditCardInfo', Schema({
    name: {
        type: String,
        required: true
    },
    card_number: {
        type: Number,
        required: true,
        validate: {
            validator: cc_number => {
                return cc_number.toString().length >= 16 && cc_number.toString().length <= 19
            },
            message: cc_number => `${cc_number.value} has to be greater than 16 digits and less than 19 digits.`
        }
    },
    balance: {
        type: Number,
        default: 0
    },
    limit: {
        type: Number,
        required: true
    }
}));

module.exports = CreditCardInfo;