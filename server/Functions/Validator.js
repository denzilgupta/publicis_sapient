exports.validate_request_body = (data) => {
    try {
        let message = [];
        if (!data.name) {
            message.push("Please provide a name.");
        }
        if (!data.card_number) {
            message.push("Please provide a credit card number.");
        }
        if (!data.limit) {
            message.push("Please provide a limit.");
        }
        return (Array.isArray(message) && message.length > 0) ? message : true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.validate_number = (data) => {
    try {
        return (typeof (data) == 'number');
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.validate_name = (data) => {
    try {
        return typeof (data) == 'string';
    } catch (error) {
        console.log(error);
        return false;
    }
}

const luhn_values_sum = {
    "10": 1,
    "12": 3,
    "14": 5,
    "16": 7,
    "18": 9
};

exports.luhn_validation = (data) => {
    try {
        let i, sum = 0, numbers = [];
        numbers = data.toString().split('').map(Number);
        if (numbers.length >= 16 && numbers.length <= 19) {
            for (i = numbers.length - 1; i >= 0; i--) {
                let element = numbers[i];
                if (i % 2 == 0) {
                    sum += element;
                } else {
                    element = element * 2;
                    element >= 10 ? sum += luhn_values_sum[element] : sum += element
                }
            }
        } else {
            return false;
        }
        return sum % 10 == 0;
    } catch (error) {
        console.log(error);
        return false;
    }
}