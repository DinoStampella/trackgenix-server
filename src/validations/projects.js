import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const teamMembersValidation = Joi.object({
    rol: Joi.string().required().valid('DEV', 'QA', 'TL', 'PM'),
    rate: Joi.number().min(1).max(1000),
  });

  const projectsValidations = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z]+$/)
      .required(),
    description: Joi.string().min(5).max(150).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date(),
    active: Joi.boolean().required(),
    clientName: Joi.string().min(2).max(30).required(),
    teamMembers: Joi.array().items(teamMembersValidation),
  });

  const validation = projectsValidations.validate(req.body);

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
