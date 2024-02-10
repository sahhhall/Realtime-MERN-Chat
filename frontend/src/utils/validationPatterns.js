const emailPattern = /\S+@\S+\.\S+/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

const validationPatterns = {
    mail: emailPattern,
    password: passwordPattern
};
const validateField = (field, value) => {
    return validationPatterns[field].test(value);
};

export default validateField
