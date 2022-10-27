import joi from 'joi';

const validationsTimesheets = (req, res, next) => {
  const validations = joi.object({
    date: joi.date().iso().required().messages({
      'date.base': 'date is format in invalid',
      'date.format': 'invalid date format',
      'any.required': 'date is required',
    }),
    description: joi.string().required().min(3).max(150)
      .messages({
        'string.empty': 'description is required',
        'string.min': 'description should have a minimum length of 3 characters',
        'string.max': 'description should have a maximum length of 150 characters',
        'any.required': 'description is required',
      }),
    task: joi.required().messages({
      'task.empty': 'task is required',
    }),
    employee: joi.required().messages({
      'employee.empty': 'employee is required',
    }),
    project: joi.required().messages({
      'project.empty': 'project is required',
    }),
    hours: joi.number().min(1).max(12).required()
      .messages({
        'hours.empty': 'description is required',
        'number.min': 'minimum 1 hour',
        'number.max': 'maximum 12 hours',
        'any.required': 'description is required',
      }),
  });
  const validate = validations.validate(req.body, { abortEarly: false });
  if (validate.error) {
    return res.status(400).json({
      message: validate.error.details,
      error: true,
      data: undefined,
    });
  }
  return next();
};

export default {
  validationsTimesheets,
};
