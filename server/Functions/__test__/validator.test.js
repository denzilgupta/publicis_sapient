const {
    validate_request_body,
    validate_name,
    validate_number,
    luhn_validation
} = require('../Validator');

/**************************************************************
 * @DESC        -   THIS TEST VALIDATES INPUT BODY
***************************************************************/
describe('Validate input body', () => {
    test('Request body should contain all fields', () => {
        const input = {
            "name": "denzil",
            "card_number": 4129708163872472,
            "limit": 2019
        };
        const output = validate_request_body(input);
        expect(output).toEqual(true);
    });

    test('Request body should contain all fields', () => {
        const output = validate_request_body({
            "name": "denzil",
            "limit": 2019
        });
        expect(output).toEqual(['Please provide a credit card number.']);
    });
});

/**************************************************************
 * @DESC        -   THIS TEST VALIDATES INPUT DATATYPES
***************************************************************/
describe('Validate input datatypes', () => {
    describe('Validate name', () => {
        test('User\'s name should only accept string as input', () => {
            const returned_value = validate_name('Denzil');
            expect(returned_value).toEqual(true);
        });

        test('User\'s name should only accept string as input', () => {
            const returned_value = validate_name(1010);
            expect(returned_value).toEqual(false);
        });
    });

    describe('Validate card number and limit', () => {
        describe('Card number', () => {
            test('CC number should be integers', () => {
                const returned_value = validate_number(1010);
                expect(returned_value).toEqual(true);
            });

            test('CC number should be integers', () => {
                const returned_value = validate_number('Denzil');
                expect(returned_value).toEqual(false);
            });
        });
        describe('Limit', () => {
            test('Limit should be integers', () => {
                const returned_value = validate_number(1010);
                expect(returned_value).toEqual(true);
            });

            test('Limit should be integers', () => {
                const returned_value = validate_number('Denzil');
                expect(returned_value).toEqual(false);
            });
        });
    })
});

/**************************************************************
 * @DESC        -   THIS TEST CHECKS WHETHER THE CARD NUMBER
 * @DESC        -   IS VALID OR NOT
***************************************************************/
describe('Luhn validation', () => {
    test('A valid card should return a value \'true\'', () => {
        const returned_value = luhn_validation('4129708163872472');
        expect(returned_value).toEqual(true);
    });

    test('A valid card should return a value of \'false\'', () => {
        const returned_value = luhn_validation('505927182736252');
        expect(returned_value).toEqual(false);
    })
});