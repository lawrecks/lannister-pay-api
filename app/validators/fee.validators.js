import Joi from 'joi';
import baseValidator from '.';

const validateSaveSetup = (req, res, next) => {
  const schema = Joi.object({
    FeeConfigurationSpec: Joi.string().required(),
  });
  baseValidator(schema, req, res, next, 'body');
};

export default validateSaveSetup;
