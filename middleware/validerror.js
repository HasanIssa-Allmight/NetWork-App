const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const formattedErrors = error.details.map(err => ({
            field: err.context.key, 
            message: err.message.replace(/"/g, '')
        }));

        return res.status(400).json({
            success: false,
            errors: formattedErrors
        });
    }

    next();
};

module.exports = validate;
