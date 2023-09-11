export function isEmailValid(email: string) {
    return email.length > 0 ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : true;
}

export function isPasswordValid(password: string) {
    //atleast one uppercase character
    //atleast one lowercase character
    //atleast one number
    //atleast one special character
    //atleast 8 characters

    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return password.length > 0 ? regex.test(password) : true;
}
