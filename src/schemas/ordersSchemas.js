import joi from 'joi';

const schemaOrders = joi.object({
  clientId: joi.number().min(1).required(),
  cakeId: joi.number().min(1).required(),
  quantity: joi.number().min(1).required(),
  totalPrice: joi.number().min(1).required()
});

export {schemaOrders};