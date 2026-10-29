function isStrongPassword(value) {
    if (typeof value !== "string") {
        console.log("Weak Password");
        return false;
    }

    const strong =
        value.length >= 12 &&
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[!@#$%^&*()_+{}\[\]|\/<>?]/.test(value) &&
        !/password/i.test(value);

    if (strong) {
        console.log("Strong Password");
    } else {
        console.log("Weak Password");
    }

    return strong;
}

const password = prompt("Enter a password:");
isStrongPassword(password);
