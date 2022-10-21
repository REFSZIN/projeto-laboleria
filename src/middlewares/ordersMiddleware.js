import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import connection from '../db/db.js';
import {schemaOrders } from '../schemas/ordersSchemas.js';

async function ordersMiddleware(req, res, next) {
  const { clientId,cakeId,quantity,totalPrice } = req.body;
  const newOrder = {
    clientId,cakeId,quantity,totalPrice
  }
  const valid = schemaOrders.validate(newOrder, {abortEarly: false});
  if(valid.errorMessage){
    const erros = validation.error.details.map((err) => err.message);
    res.status(STATUS_CODE.ERRORBADREQUEST).send(
      `Todos os campos são obrigatórios! : ${erros}`
      ); 
    return res.send(STATUS_CODE.UNAUTHORIZED);
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
    if (!HaveClient.rowCount || !HaveCake.rowCount) {
      return res.send(STATUS_CODE.ERRORNOTFOUND);
    }
    if (quantity.typeof !== 'number'|| quantity > 0 || quantity <= 5 || totalPrice.typeof !== 'number') {
      return res.send(STATUS_CODE.ERRORBADREQUEST);
    }
    res.locals.order = newOrder;
    next();
  } catch (error) {
    console.log(error);
    return res.send(STATUS_CODE.SERVER_ERROR);
  }
}

export { ordersMiddleware };