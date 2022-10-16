import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.required().regex(/^[a-zA-Z]+$/).string().min(2)
      .max(30),
    lastName: Joi.required().regex(/^[a-zA-Z]+$/).string().min(2)
      .max(30),
    email: Joi.required().string().email(),
    password: Joi.required().string().alphanum().min(8)
      .max(50),
    dni: Joi.required().string().regex(/^\d+$/).min(7)
      .max(11),
    phone: Joi.string().regex(/^\d+$/).min(8).max(15),
    location: Joi.string().min(3).max(50),
  });

  const validation = adminValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `An error has occurred: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
