import { validateEmail, validateLength, validatePassword, validateString } from "../validation_constraints";

export const validateInput = (inputId, inputValue) => {
    if (inputId === "firstName" || inputId === "lastName") {
        return validateString(inputId, inputValue);
    } else if (inputId === "email") {
        return validateEmail(inputId, inputValue);
    } else if (inputId === "password") {
        return validatePassword(inputId, inputValue);
    } else if (inputId === "about") {
        return validateLength(inputId, inputValue, 0, 150, true);
    } else if (inputId === "chatName") {
        return validateLength(inputId, inputValue, 5, 50, false);
    }
};

// export const validateInput2 = (inputId, inputValue) => {
//     switch (inputId) {
//         case "firstName":
//         case "lastName":
//             return validateString(inputId, inputValue);
//         case "email":
//             return validateEmail(inputId, inputValue);
//         case "password":
//             return validatePassword(inputId, inputValue);
//         case "about":
//             return validateLength(inputId, inputValue, 0, 150, true);
//         case "chatName":
//             return validateLength(inputId, inputValue, 0, 150, false);
//     };
// };