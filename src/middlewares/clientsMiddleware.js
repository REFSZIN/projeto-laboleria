import { STATUS_CODE } from '../enums/statusCode.js';
import { schemaClients } from '../schemas/clientsSchemas.js';


async function clientsMiddleware(req, res, next) {
  const { name, address, phone} = req.body;
  const newClient = {
    name, address, phone
  };
  const valid = schemaClients.validate(newCake, {abortEarly: false});
  if(valid.errorMessage){
    const erros = validation.error.details.map((err) => err.message);
    res.status(STATUS_CODE.ERRORBADREQUEST).send(
      `Todos os campos são obrigatórios! : ${erros}`
      ); 
    return res.send(STATUS_CODE.UNAUTHORIZED);
  }
  try {
    if (
      name === null || name === undefined || name.typeof !== 'string' ||
      address === null || address === undefined || address.typeof !== 'string'|| address.typeof !== 'string' ||
      phone === null || phone === undefined || phone.typeof !== 'string' ||
      phone.length === 0 || address.length === 0 || name.length === 0 || phone.length > 11 || phone.length < 10 ) {
      return res.send(STATUS_CODE.ERRORBADREQUEST);
    }
    res.locals.client = newClient;
    next();
  } catch (error) {
    console.log(error);
    return res.send(STATUS_CODE.SERVER_ERROR);
  }
}

export { clientsMiddleware };