import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import connection from '../db/db.js';
import { schemaCakes } from '../schemas/cakesSchemas.js';

async function cakesMiddleware(req, res, next) {
  const { name, price, image, description, flavourId } = req.body;
  if (
    price === null || price === undefined || typeof(price) !== 'number' ||
    flavourId === null || flavourId === undefined || typeof(flavourId) !== 'number' ||
    description.length === 0 || name.length === 0) {
    return res.sendStatus(STATUS_CODE.ERRORBADREQUEST);
  }
  const newCake = {
    name, price, image, description, flavourId
  };
  const {error} = schemaCakes.validate(newCake, {abortEarly: false});
  if(error){
    const erros = error.details.map((err) => err.message);
    res.status(STATUS_CODE.ERRORBADREQUEST).send(
      `Todos os campos são obrigatórios! : ${erros}`
      ); 
    return res.sendStatus(STATUS_CODE.ERRORUNAUTHORIZED);
  }
  try {
    const SameCake = await connection.query( `
      SELECT * FROM ${COLLECTIONS.CAKES} WHERE name = $1;
    `,
      [`${name}`]
    );
    if (SameCake?.rows[0]?.name === name) {
      return res.sendStatus(STATUS_CODE.ERRORCONFLICT);
    }
    const HaveFlavours = await connection.query( `
      SELECT * FROM ${COLLECTIONS.FLAVOURS} WHERE id = $1;
    `,
      [`${flavourId}`]
    );
    if (!HaveFlavours.rowCount) {
      return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
    }
    if (price <= 0 || price === null || price === undefined) {
      return res.sendStatus(STATUS_CODE.ERRORBADREQUEST);
    }
    if (image.length === 0) {
      return res.sendStatus(STATUS_CODE.ERRORUNPROCESSABLEENTITY);
    }
    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { cakesMiddleware };