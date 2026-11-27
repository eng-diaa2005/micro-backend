export const validate = (schema) => {

    return (req, res, next) => {

        const data = {
            ...req.body,
            ...req.params,
            ...req.query
        };

        if (req.file) {
            data.file = req.file;
        }

        const result = schema.validate(data, {
            abortEarly: false
        });

        if (result.error) {
            const resultMessage = result.error.details.map(
                (detail) => detail.message
            );
            return next(new Error(resultMessage.join(", "), { cause: 400 }));
        }

        next();
    };
};