import joi from 'joi';

const validationsSuperAdmins = (req, res, next) => {
  const validations = joi.object({
    firstName: joi.string().min(2).max(30).required(),
    lastName: joi.string().min(2).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(50).required(),
    dni: joi.string().min(7).max(10).required(),
    phone: joi.string().min(8).max(15),
    location: joi.string().min(3).max(50),
  });
  const superAdminsValidations = validations.validate(req.body);

  if (superAdminsValidations.error) {
    return res.status(400).json({
      message: `There was an error: ${superAdminsValidations.error.details[0].message}`,
      error: true,
    });
  }
  return next();
};

export default {
  validationsSuperAdmins,
};
