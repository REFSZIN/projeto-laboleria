import joi from 'joi';

const schemaClients = joi.object({
  name: joi.string().min(1).required(), 
  adress: joi.string().min(1).required(),
  phone: joi.string().min(10).max(11).required(),
});

export {schemaClients};