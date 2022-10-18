import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const teamMembersValidation = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.empty': 'name is required',
        'string.base': 'name should be only letters',
        'string.min': 'name should have a minimum length of 2 character',
        'string.max': 'name should have a maximun length of 30 character',
        'any.required': 'name is required',
      }),
    rol: Joi.string()
      .required()
      .messages({
        'string.empty': 'rol is required',
        'string.base': 'rol should be DEV, TL or QA',
        'any.required': 'rol is required',
      }),
    rate: Joi.number()
      .required()
      .messages({
        'string.empty': 'rate is required',
        'string.base': 'rate should be date',
        'any.required': 'rate is required',
      }),
  });

  const projectvalidation = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.empty': 'name is required',
        'string.base': 'name should be only letters',
        'string.min': 'name should have a minimum length of 2 character',
        'string.max': 'name should have a maximun length of 30 character',
        'any.required': 'name is required',
      }),
    description: Joi.string()
      .min(2)
      .max(150)
      .required()
      .messages({
        'string.empty': 'description is required',
        'string.base': 'description should be only letters',
        'string.min': 'description should have a minimum length of 2 character',
        'string.max': 'description should have a maximun length of 150 character',
        'any.required': 'description is required',
      }),
    startDate: Joi.date()
      .required()
      .messages({
        'string.empty': 'startDate is required',
        'string.base': 'startDate should be date',
        'any.required': 'startDate is required',
      }),
    endDate: Joi.date()
      .max(new Date())
      .required().messages({
        'string.empty': 'endDate is required',
        'string.base': 'endDate should date format',
        'any.required': 'endDate a required',
      }),
    active: Joi.boolean()
      .required(),
    clientName: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.empty': 'clientName is required',
        'string.base': 'clientName sould be only letters',
        'string.min': 'clientName sould have a minimum length of 2 character',
        'string.max': 'clientName sould have a maximun length of 150 character',
        'any.required': 'clientName is required',
      }),
    teamMembers: Joi.array()
      .items(teamMembersValidation)
      .messages({
        'string.empty': 'teamMembers is required',
        'string.base': 'the rol is not valid',
      }),
  });

  const validation = projectvalidation.validate(req.body, { abortEarly: false });
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
