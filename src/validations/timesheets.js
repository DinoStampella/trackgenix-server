import joi from 'joi';

const validationsTimesheets = (req, res, next) => {
  const validations = joi.object({
    date: joi.date().iso().required().messages({
      'date.base': 'date is format in invalid',
      'date.format': 'invalid date format',
    }),
    description: joi.string().required().valid('Frontend', 'Backend', 'Testing').messages({
      'string.empty': 'description is required',
      'string.pattern.base': 'description should be Frontend, Backend, Testing',
      'any.required': 'description is required',
    }),
    task: joi.required(),
    employee: joi.required(),
    project: joi.required(),
    hours: joi.number().min(1).required().messages({
      'hours.empty': 'description is required',
      'number.min': 'minimum 1 hour',
      'any.required': 'description is required',
    }),
  });
  const validate = validations.validate(req.body, { abortEarly: false });
  if (validate.error) {
    return res.status(400).json({
      message: validate.error.details,
      data: undefined,
    });
  }
  return next();
};

export default {
  validationsTimesheets,
};
