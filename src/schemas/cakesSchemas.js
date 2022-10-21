import joi from 'joi';

const schemaCakes = joi.object({
  name: joi.string().min(2).required(), 
  price: joi.number().min(1).required(),
  description: joi.string().allow(null).required(),
  image: joi.string().uri().required(),
  flavourId : joi.number().min(1).required(),
});

const schemaFlavours= joi.object({
  name: joi.string().min(2).required(),
});

export {schemaFlavours,schemaCakes};