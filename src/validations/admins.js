import Joi from 'joi';

const validatePost = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().regex('/^[a-zA-Z]+$/').min(2).max(30)
      .required(),
    lastName: Joi.string().regex('/^[a-zA-Z]+$/').min(2).max(30)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(50)
      .required(),
    dni: Joi.number.min(7).max(10).required(),
    phone: Joi.number.min(8).max(15),
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
  validatePost,
};
