import joi from 'joi';

const schemaOrders = joi.object({
  cakeId: joi.number().integer().min(1).required(),
  clientId: joi.number().integer().min(1).required(),
  quantity: joi.number().integer().min(1).required(),
  totalPrice: joi.number().min(1).required()
});
export {schemaOrders};