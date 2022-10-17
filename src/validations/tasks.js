import Joi from 'joi';

const validateCreation = (req, res, next) => {
    const taskValidation = Joi.object({
        description: Joi.string().valid('Frontend', 'Backend').required()
    });

    const validation = taskValidation.validate(req.body, { abortEarly: false });

    if (validation.error) {
        return res.status(400).json({
            message: `There was an error: ${validation.error.details[0].message}`,
            data: undefined,
            error: true,
        });
    }
    return next();
};

export default {
    validateCreation,
};