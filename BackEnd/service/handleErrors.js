const handleErrors = (error, errors) => {
    if (error.message === 'incorrect password') {
        errors.password = 'incorrect password';
        return errors;
    }
    if (error.message === 'incorrect email') {
        errors.email = 'incorrect email';
        return errors;
    }
    if (error.code === 11000) {
        errors.email = 'email already exists';
        return errors;
    }

    if (error.message.includes('validation failed') || error.message.includes('Validation failed')) {
        Object.values(error.errors).forEach((properties) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}
module.exports =
{
    handleErrors
}