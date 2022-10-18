import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const teamMembersValidation = Joi.object({
    id: Joi.string().required()
      .valid(
        '634b2bc0d9f82c5b39e8c6e4',
        '634b2e80d9f82c5b39e8c6e6',
        '634b2f69d9f82c5b39e8c6e8',
        '634b2f95d9f82c5b39e8c6ea',
        '634b2fd6d9f82c5b39e8c6ec',
      ),
    rol: Joi.string().required().valid('DEV', 'QA', 'TL', 'PM')
      .messages({
        'string.empty': 'rol required',
        'string.pattern.base': 'rol can only be DEV, QA, TL or PM',
        'any.required': 'rol required',
      }),
    rate: Joi.number().min(1).max(1000)
      .messages({
        'number.pattern.base': 'rate should be numbers only',
        'number.min': 'rate should have a minimum of 1',
        'number.max': 'rate should have a maximum of 1000',
      }),
  });

  const projectsValidations = Joi.object({
    name: Joi.string().min(3).max(30).regex(/^[a-zA-Z]+$/)
      .required()
      .messages({
        'string.empty': 'Name required',
        'string.pattern.base': 'Name should be letters only',
        'string.min': 'Name should have a minimum length of 3 characters',
        'string.max': 'Name should have a maximum length of 30 characters',
        'any.required': 'Name required',
      }),
    description: Joi.string().min(5).max(150).required()
      .messages({
        'string.empty': 'Description required',
        'string.min': 'Description should have a minimum length of 5 characters',
        'string.max': 'Description should have a maximum length of 150 characters',
        'any.required': 'Description required',
      }),
    startDate: Joi.date().greater('now').required()
      .messages({
        'date.empty': 'StartDate required',
        'date.pattern.base': 'StartDate must be after today',
        'any.required': 'StartDate required',
      }),
    endDate: Joi.date().greater('now')
      .messages({
        'date.pattern.base': 'EndDate must be after today',
      }),
    active: Joi.boolean().required()
      .messages({
        'string.empty': 'Active required',
        'string.pattern.base': 'Active should be true or false',
        'any.required': 'Active required',
      }),
    clientName: Joi.string().min(2).max(30).required()
      .messages({
        'string.empty': 'clientName required',
        'string.min': 'clientName should have a minimum length of 2 characters',
        'string.max': 'clientName should have a maximum length of 30 characters',
        'any.required': 'clientName required',
      }),
    teamMembers: Joi.array().items(teamMembersValidation),
  });

  const validation = projectsValidations.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
