import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const superAdminsValidations = Joi.object({
    firstName: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30)
      .required(),
    lastName: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(50)
      .required(),
    phone: Joi.string().regex(/^[0-9]*$/).min(8).max(15),
    location: Joi.string().min(3).max(50),
    dni: Joi.string().regex(/^[0-9]*$/).min(7).max(11)
      .required(),
  });

  const validation = superAdminsValidations.validate(req.body);

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
