import joi from 'joi';

const validationsTimesheets = (req, res, next) => {
  const validations = joi.object({
    date: joi.date().iso().required().messages({
      'date.base': 'date is format in invalid',
      'date.format': 'invalid date format',
    }),
    task: joi.string().required().messages({
      'any.required': 'task is required',
    }),
    description: joi.string().required().valid('Frontend', 'Backend', 'Testing').messages({
      'string.empty': 'description is required',
      'string.pattern.base': 'description should be Frontend, Backend, Testing',
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
