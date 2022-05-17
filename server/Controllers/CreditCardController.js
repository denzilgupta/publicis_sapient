const CreditCard = require('../Models/CreditCard');

/**************************************************************
 * @DESC        -   IMPORT VALIDATOR
***************************************************************/
const {
    validate_request_body,
    validate_number,
    validate_name,
    luhn_validation
} = require('../Functions/Validator');

/**************************************************************
 * @DESC        -   CHECK WHETHER BODY IS EMPTY
***************************************************************/
exports.body_validator = async (request, response, next) => {
    try {
        let validation_response = validate_request_body(request.body);
        if (validation_response == true) {
            next();
        } else {
            return response.status(400).json({ data: null, error: validation_response, success: false });
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({ data: null, error: error.message, success: false });
    }
}

/**************************************************************
 * @DESC        -   CHECK WHETHER DATATYPES ARE CORRECT
***************************************************************/
exports.datatype_validator = async (request, response, next) => {
    try {
        const { name, card_number, limit } = request.body;
        if (validate_name(name) && validate_number(card_number) && validate_number(limit)) {
            next();
        } else {
            return response.status(400).json({ data: null, error: "Datatype error.", success: false });
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({ data: null, error: error.message, success: false });
    }
}

/**************************************************************
 * @DESC        -   CONTROLLER TO CREATE A NEW CC DOCUMENT
***************************************************************/
exports.create_new_credit_card = async (request, response, next) => {
    try {
        const { name, card_number, limit } = request.body;

        if (luhn_validation(card_number)) {
            var new_cc_info = await CreditCard.create({
                name: name,
                card_number: card_number,
                limit: limit
            });
            if (new_cc_info) {
                return response.status(201).json({ data: new_cc_info, error: null, success: false });
            } else {
                return response.status(400).json({ data: null, error: error.message, success: false });
            }
        } else {
            return response.status(400).json({ data: null, error: "Please enter a valid card number.", success: false });
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json({ data: null, error: error.message, success: false });
    }
};

/**************************************************************
 * @DESC        -   CONTROLLER TO VIEW ALL CC DOCUMENTS
***************************************************************/
exports.view_all_credit_cards = async (request, response, next) => {
    try {
        const all_credit_cards = await CreditCard.find({});
        if (Array.isArray(all_credit_cards) && all_credit_cards.length > 0) {
            return response.status(200).json({ data: all_credit_cards, error: null, success: true });
        } else {
            return response.status(200).json({ data: null, error: "No data available.", success: false });
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({ data: null, error: error.message, success: false });
    }
};