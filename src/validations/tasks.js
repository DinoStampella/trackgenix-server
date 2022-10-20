import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const taskValidation = Joi.object({
    description: Joi.string().valid('Frontend', 'Backend', 'Testing').required()
      .messages({
        'string.empty': 'A description is required',
        'any.only': 'Description should be Frontend, Backend or Testing',
        'any.required': 'A description is required',
      }),
  });

  const validate = taskValidation.validate(req.body, { abortEarly: false });
  if (validate.error) {
    return res.status(400).json({
      message: validate.error.details,
      data: undefined,
    });
  }
  return next();
};

export default {
  validateCreation,
};
