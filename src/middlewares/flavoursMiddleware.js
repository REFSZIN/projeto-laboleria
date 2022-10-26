import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import connection from '../db/db.js';
import {schemaFlavours} from '../schemas/cakesSchemas.js';

async function flavoursMiddleware(req, res, next) {
  const { name } = req.body;
  const clname = name.trim();
  const newFlavour = {
    clname
  };
  const valid = schemaFlavours.validate(newFlavour, {abortEarly: false});
  if(valid.errorMessage){
    const erros = validation.error.details.map((err) => err.message);
    res.status(STATUS_CODE.ERRORBADREQUEST).send(
      `Todos os campos são obrigatórios! : ${erros}`
      ); 
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  try {
    const HaveFlavours = await connection.query( `
      SELECT * FROM ${COLLECTIONS.FLAVOURS} WHERE name LIKE $1;
    `,
      [`${clname}`]
    );
    if (HaveFlavours.rowCount > 0) {
      return  res.sendStatus(STATUS_CODE.ERRORCONFLICT);
    }
    if (clname.length <= 1) {
      return  res.sendStatus(STATUS_CODE.ERRORBADREQUEST);
    }
    next();
  } catch (error) {
    console.error(error);
    return  res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { flavoursMiddleware };