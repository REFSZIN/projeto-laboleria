import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import connection from '../db/db.js';
import { schemaCakes } from '../schemas/cakesSchemas.js';

async function cakesMiddleware(req, res, next) {
  const { name, price, image, description,flavourId } = req.body;
  const newCake = {
    name, price, image, description, flavourId
  };
  const valid = schemaCakes.validate(newCake, {abortEarly: false});
  if(valid.errorMessage){
    const erros = validation.error.details.map((err) => err.message);
    res.status(STATUS_CODE.ERRORBADREQUEST).send(
      `Todos os campos são obrigatórios! : ${erros}`
      ); 
    return res.send(STATUS_CODE.UNAUTHORIZED);
  }
  try {
    const SameCake = await connection.query( `
      SELECT * FROM ${COLLECTIONS.CAKES} WHERE name LIKE $1;
    `,
      [`${name}`]
    );
    if (SameCake.rows[0].name === name) {
      return res.send(STATUS_CODE.ERRORCONFLICT);
    }
    const HaveFlavours = await connection.query( `
      SELECT * FROM ${COLLECTIONS.FLAVOURS} WHERE id = $1;
    `,
      [`${flavourId}`]
    );
    if (!HaveFlavours.rowCount) {
      return res.send(STATUS_CODE.ERRORNOTFOUND);
    }
    if (price <= 0 || price === null || price === undefined || description.typeof !== 'string') {
      return res.send(STATUS_CODE.ERRORBADREQUEST);
    }
    if (image.length === 0) {
      return res.send(STATUS_CODE.ERRORUNPROCESSABLEENTITY);
    }
    res.locals.cake = newCake;
    next();
  } catch (error) {
    console.log(error);
    return res.send(STATUS_CODE.SERVER_ERROR);
  }
}

export { cakesMiddleware };