import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import connection from '../db/db.js';
import {schemaFlavours} from '../schemas/cakesSchemas.js';

async function flavoursMiddleware(req, res, next) {
  const { name } = req.body;
  const newFlavour = {
    name
  };
  const valid = schemaFlavours.validate(newFlavour, {abortEarly: false});
  if(valid.errorMessage){
    const erros = validation.error.details.map((err) => err.message);
    res.status(STATUS_CODE.ERRORBADREQUEST).send(
      `Todos os campos são obrigatórios! : ${erros}`
      ); 
    return res.send(STATUS_CODE.UNAUTHORIZED);
  }
  try {
    const HaveFlavours = await connection.query( `
      SELECT * FROM ${COLLECTIONS.FLAVOURS} WHERE name LIKE $1;
    `,
      [`${name}`]
    );
    if (!HaveFlavours.rowCount) {
      return res.send(STATUS_CODE.ERRORCONFLICT);
    }
    if (name !== 'string'|| name.length <= 1) {
      return res.send(STATUS_CODE.ERRORBADREQUEST);
    }
    res.locals.flavour = newFlavour;
    next();
  } catch (error) {
    console.log(error);
    return res.send(STATUS_CODE.SERVER_ERROR);
  }
}

export { flavoursMiddleware };