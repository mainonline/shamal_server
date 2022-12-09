export const validatePassword = (value: string) => {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const uppercaseChars = /[A-Z]/;
    const lowercaseChars = /[a-z]/;
    const numericChars = /\d/;
    if (value.length < 8) {
        throw new Error('length of password more than 8');
    }
    if (!lowercaseChars.test(value)) {
        throw new Error('should contain lowercase char');
    }
    if (!uppercaseChars.test(value)) {
        throw new Error('should contain uppercase char');
    }
    if (!numericChars.test(value)) {
        throw new Error('should contain numeric char');
    }
    if (!specialChars.test(value)) {
        throw new Error('should contain special char');
    }
}