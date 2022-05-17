const express = require('express');
const router = express.Router();

/**************************************************************
 * @ROUTE       -   /api/test
 * @DESC        -   CREATE A NEW CREDIT CARD IN THE SYSTEM
 * @ACCESS      -   PUBLIC
 * @AUTH        -   NONE
***************************************************************/
router.get('/', async (request, response, next) => {
    try {
        return response.status(200).json({ data: "Test API is working.", error: null, success: true });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ data: null, error: error.message, success: false });
    }
});

module.exports = router;