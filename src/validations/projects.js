import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const teamMembersValidation = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    rol: Joi.string()
      .required(),
    rate: Joi.string()
      .required(),
  });

  const projectvalidation = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    description: Joi.string()
      .min(2)
      .max(150)
      .required(),
    startDate: Joi.date()
      .required(),
    endDate: Joi.date()
      .max(new Date())
      .required(),
    active: Joi.boolean()
      .required(),
    clientName: Joi.string()
      .min(2)
      .max(30)
      .required(),
    teamMembers: Joi.array()
      .items(teamMembersValidation),
  });

  const validation = projectvalidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message} `,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
