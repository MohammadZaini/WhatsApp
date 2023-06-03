import { validateEmail, validatePassword, validateString } from "../validation_constraints";

export const validateInput = (inputId, inputValue) => {
    if (inputId === "firstName" || inputId === "lastName") {
        return validateString(inputId, inputValue)
    } else if (inputId === "email") {
        return (validateEmail(inputId, inputValue))
    } else {
        return (validatePassword(inputId, inputValue))
    }
};