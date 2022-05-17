const express = require('express');
const router = express.Router();

/**************************************************************
 * @DESC        -   Import controllers
***************************************************************/
const {
    body_validator,
    datatype_validator,
    create_new_credit_card,
    view_all_credit_cards
} = require('../Controllers/CreditCardController.js');

/**************************************************************
 * @ROUTE       -   /api/credit-card/create
 * @DESC        -   CREATE A NEW CREDIT CARD IN THE SYSTEM
 * @ACCESS      -   PUBLIC
 * @AUTH        -   NONE
***************************************************************/
router.post('/create', body_validator, datatype_validator, create_new_credit_card);

/**************************************************************
 * @ROUTE       -   /api/credit-card/view
 * @DESC        -   FETCH CC INFO FOR ALL USERS
 * @ACCESS      -   PUBLIC
 * @AUTH        -   NONE
***************************************************************/
router.get('/view', view_all_credit_cards);

module.exports = router;