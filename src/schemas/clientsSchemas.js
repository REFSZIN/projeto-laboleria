import joi from 'joi';

const schemaClients = joi.object({
  name: joi.string().min(1).required(), 
  adress: joi.string().min(1).required(),
  phone: joi.string().length(10).pattern(/^[0-9]+$/).required()
});

export {schemaClients};