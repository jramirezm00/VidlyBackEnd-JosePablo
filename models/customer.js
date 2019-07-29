const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true,
    default: false
  },
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 8
  }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
  const schema = {
    isGold: Joi.boolean().required(),
    name: Joi.string()
      .min(4)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(8)
      .max(8)
      .required()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
