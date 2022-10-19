import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const timesheetValidations = Joi.object({
    date: Joi.date().required().max(new Date()).messages({
      'string.empty': 'Date required',
      'date.pattern.base': 'Date must be after today',
      'any.required': 'Date required',
    }),
    task: Joi.string().min(3).max(20).required()
      .messages({
        'string.empty': 'Task required',
        'string.min': 'Task should have a minimum length of 3 characters',
        'string.max': 'Task should have a maximum length of 20 characters',
        'any.required': 'Task required',
      }),
    description: Joi.string().min(3).max(150).required()
      .messages({
        'string.empty': 'Description required',
        'string.min': 'Description should have a minimum length of 3 characters',
        'string.max': 'Description should have a maximum length of 150 characters',
        'any.required': 'Description required',
      }),
  });

  const validation = timesheetValidations.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details,
      date: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
