import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const timesheetValidations = Joi.object({
    date: Joi.date().required().max(new Date()),
    task: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(3).max(150).required(),
  });

  const validation = timesheetValidations.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error :${validation.error.details[0].message}`,
      date: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
