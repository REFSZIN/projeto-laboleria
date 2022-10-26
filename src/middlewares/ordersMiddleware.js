import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import connection from '../db/db.js';
import {schemaOrders } from '../schemas/ordersSchemas.js';

async function ordersMiddleware(req, res, next) {
  const { cakeId,clientId,quantity,totalPrice} = req.body;

  const newOrder = {
    cakeId,clientId,quantity,totalPrice
  }

  const valid = schemaOrders.validate(newOrder, {abortEarly: false});
  if(valid.errorMessage){
    const erros = validation.error.details.map((err) => err.message);
    res.status(STATUS_CODE.ERRORBADREQUEST).send(
      `Todos os campos são obrigatórios! : ${erros}`
      ); 
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  try {
    const HaveClient = await connection.query( `
      SELECT * FROM ${COLLECTIONS.CLIENTS} WHERE id = $1;
    `,
      [`${clientId}`]
    );
    const HaveCake = await connection.query( `
      SELECT * FROM ${COLLECTIONS.CAKES} WHERE id = $1;
    `,
    [`${cakeId}`]
    );
    if (HaveClient.rowCount <= 0 || HaveCake.rowCount <= 0) {
      return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
    }
    if (isNaN(parseInt(cakeId))||isNaN(parseInt(clientId))||isNaN(parseInt(quantity))||isNaN(parseInt(totalPrice))) {
      return res.sendStatus(STATUS_CODE.ERRORBADREQUEST);
    }
    if (
      cakeId === null || cakeId === undefined || typeof(cakeId) !== 'number' ||
      clientId === null || clientId === undefined || typeof(clientId) !== 'number' ||
      quantity === null || quantity === undefined || typeof(quantity) !== 'number' ||
      totalPrice === null || totalPrice === undefined || typeof(totalPrice) !== 'number' ||
      totalPrice.length === 0 || quantity.length === 0 || clientId.length === 0|| cakeId.length === 0) {
      return res.sendStatus(STATUS_CODE.ERRORBADREQUEST);
    }
    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { ordersMiddleware };