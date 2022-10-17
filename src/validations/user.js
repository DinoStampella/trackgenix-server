import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const userValidation = Joi.object({
    firstName: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30)
      .required(),
    lastName: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30)
      .required(),
    email: Joi.string().required().email(),
    password: Joi.string().alphanum().min(8).max(50)
      .required(),
    dni: Joi.string().regex(/^\d+$/).min(7).max(11)
      .required(),
    phone: Joi.string().regex(/^\d+$/).min(8).max(15),
    location: Joi.string().min(3).max(50),
  });
  const validation = userValidation.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      message: 'There was an error',
      data: undefined,
    });
  }
  return next();
};

export default {
  validateCreation,
};
