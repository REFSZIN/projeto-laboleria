import { STATUS_CODE } from '../enums/statusCode.js';
import { COLLECTIONS } from '../enums/collections.js';
import { schemaClients } from '../schemas/clientsSchemas.js';
import connection from '../db/db.js';

async function clientsMiddleware(req, res, next) {
  const { name, address, phone} = req.body;
  if (
    name === null || name === undefined || typeof(name) !== 'string' ||
    address === null || address === undefined || typeof(address) !== 'string' ||
    phone === null || phone === undefined || typeof(phone) !== 'string' ||
    phone.length <= 9 || phone.length >= 12 || address.length === 0 || name.length === 0) {
    return res.sendStatus(STATUS_CODE.ERRORBADREQUEST);
  }
  req.body = {
    name: name.trim(),
    address: address.trim(),
    phone: phone.trim()
  };
  const clname = name.trim()
  const claddress = address.trim()
  const clphone = phone.trim()

  const newClient = {
    name: name.trim(), address: address.trim(), phone: phone.trim()
  };

  const valid = schemaClients.validate(newClient, {abortEarly: false});
  if(valid.errorMessage){
    const erros = validation.error.details.map((err) => err.message);
    res.status(STATUS_CODE.ERRORBADREQUEST).send(
      `Todos os campos são obrigatórios! : ${erros}`
      ); 
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  try {
    const HaveClient = await connection.query( `
    SELECT * FROM ${COLLECTIONS.CLIENTS} WHERE name LIKE $1;
    `,
      [`${clname}`]
    );
    if (HaveClient.rowCount > 0) {
      return  res.sendStatus(STATUS_CODE.ERRORCONFLICT);
    }
    if (
      clname === null || clname === undefined || typeof(clname) !== 'string' ||
      claddress === null || claddress === undefined || typeof(claddress) !== 'string' ||
      clphone === null || clphone === undefined || typeof(clphone) !== 'string' ||
      clphone.length === 0 || claddress.length === 0 || clname.length === 0) {
      return res.sendStatus(STATUS_CODE.ERRORBADREQUEST);
    }
    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { clientsMiddleware };