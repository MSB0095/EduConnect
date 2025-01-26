const { validationResult, body } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.postValidation = [
  body('text', 'Text is required').not().isEmpty(),
  validate
];

exports.profileValidation = [
  body('institution', 'Institution is required').not().isEmpty(),
  body('status', 'Status is required').not().isEmpty(),
  body('interests', 'Interests must be an array').isArray(),
  validate
];

module.exports = validate;
