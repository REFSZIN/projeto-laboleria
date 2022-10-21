import connection from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';

async function postNewOrder(clientId,cakeId,quantity,totalPrice) {
  return connection.query(
    `
    INSERT INTO ${COLLECTIONS.ORDERS} 
      (clientId,cakeId,quantity,totalPrice)
    VALUES 
      ($1, $2, $3, $4);
  `,
    [`${clientId}`,`${cakeId}`,`${quantity}`,`${totalPrice}`]
  );
}

async function getOrders(id) {
  const Orders = await connection.query(`
      SELECT * FROM  ${COLLECTIONS.ORDERS} o
      WHERE o.id = $1`,
    [`${id}`]
  );
  if(Orders.rowCount === 0){
    return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
  }
}

async function getOrder(id) {
  const Order = await connection.query(`
      SELECT * FROM  ${COLLECTIONS.ORDERS} o
      WHERE o.id = $1`,
    [`${id}`]
  );
  if(Order.rowCount === 0){
    return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
  }
}

async function patchOrder(id) {
  const patch = await connection.query(`
      UPDATE ${COLLECTIONS.ORDERS} o
      SET  isDelivered = true 
      WHERE o.id = $1`,
    [`${id}`]
  );
  if(patch.rowCount === 0){
    return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
  }
}
export { postNewOrder,getOrder,getOrders,patchOrder};