import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const taskvalidation = Joi.object({
    description: Joi.string()
      .required()
      .messages({
        'string.empty': 'description is required',
        'string.base': 'description should Frontend, Backend, Testing',
        'any.required': 'description is required',
      }),
  });
  const validation = taskvalidation.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(400).json({
      message: `There was a validation error: ${validation.error.details[0].message} `,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
