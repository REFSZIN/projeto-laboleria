
import connection from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';

async function postNewOrder(cakeId,clientId,quantity,totalPrice) {
  const t = new Date().toGMTString(); 
  return connection.query(
    `
    INSERT INTO ${COLLECTIONS.ORDERS} 
      ("cakeId","clientId",quantity,"totalPrice","createdAt")
    VALUES 
      ($1, $2, $3, $4, $5);
  `,
    [`${cakeId}`, `${clientId}`,`${quantity}`,`${totalPrice}`,`${t}`]
  );
}

async function getOrders() {
  const Orders = await connection.query(`
      SELECT * FROM  ${COLLECTIONS.ORDERS}`
  );
  if(Orders.rowCount === 0){
    return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
  }
  return Orders;
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
  return Order;
}

async function patchOrder(id) {
  const patch = await connection.query(`
      UPDATE ${COLLECTIONS.ORDERS} o
      SET  "isDelivered" = true 
      WHERE o.id = $1`,
    [`${id}`]
  );
  if(patch.rowCount === 0){
    return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
  }
  return patch;
}
export { postNewOrder,getOrder,getOrders,patchOrder};