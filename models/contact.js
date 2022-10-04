const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const handleSaveErrors = (error, data, next) => {
  const { name, code } = error;

  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

contactSchema.post('save', handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().trim().required(),
  favorite: Joi.bool(),
})
  .min(1)
  .required();

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const joiSchema = { addSchema, updateFavoriteSchema };

const Contact = model('contact', contactSchema);

module.exports = { Contact, joiSchema };
