import joi from 'joi';

const schemaClients = joi.object({
  name: joi.string().min(1).required(), 
  adress: joi.string().min(1).required(),
  phone: joi.string().length(10).regex(/^[z0-9]+$/).required()
});

export {schemaClients};