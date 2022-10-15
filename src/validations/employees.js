import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeeValidation = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(50)
      .required(),
    dni: Joi.string().min(7).max(10).required(),
    phone: Joi.string().min(8).max(15),
    location: Joi.string().min(3).max(50),
  });

  const validation = employeeValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message},`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
