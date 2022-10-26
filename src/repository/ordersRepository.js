
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
  SELECT 
  ${COLLECTIONS.CLIENTS}.name as nameclient,
  ${COLLECTIONS.CLIENTS}.id as idclient,
  ${COLLECTIONS.CLIENTS}.address,
  ${COLLECTIONS.CLIENTS}.phone,	
    ${COLLECTIONS.CAKES}.* AS cake,
    ${COLLECTIONS.ORDERS}.quantity,
    ${COLLECTIONS.ORDERS}."totalPrice",
    ${COLLECTIONS.ORDERS}."createdAt",
    ${COLLECTIONS.ORDERS}."isDelivered",
    ${COLLECTIONS.ORDERS}.id as "ordersId"
      FROM ${COLLECTIONS.ORDERS} 
      inner JOIN ${COLLECTIONS.CLIENTS} ON ${COLLECTIONS.CLIENTS}.id = ${COLLECTIONS.ORDERS}."clientId"
      inner JOIN ${COLLECTIONS.CAKES} ON ${COLLECTIONS.CAKES}.id = ${COLLECTIONS.ORDERS}."cakeId";`
  );
  if(Orders.rowCount === 0){
    return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
  }
  return Orders;
}
async function getOrder(id) {
  const Order = await connection.query(`
  SELECT 
  ${COLLECTIONS.CLIENTS}.name as nameclient,
  ${COLLECTIONS.CLIENTS}.id as idclient,
  ${COLLECTIONS.CLIENTS}.address,
  ${COLLECTIONS.CLIENTS}.phone,	
  ${COLLECTIONS.CAKES}.* AS cake,
    ${COLLECTIONS.ORDERS}.quantity,
    ${COLLECTIONS.ORDERS}."totalPrice",
    ${COLLECTIONS.ORDERS}."createdAt",
    ${COLLECTIONS.ORDERS}."isDelivered",
    ${COLLECTIONS.ORDERS}.id as ordersId
      FROM orders 
      inner JOIN ${COLLECTIONS.CLIENTS} ON ${COLLECTIONS.CLIENTS}.id = ${COLLECTIONS.ORDERS}."clientId"
      inner JOIN ${COLLECTIONS.CAKES} ON ${COLLECTIONS.CAKES}.id = ${COLLECTIONS.ORDERS}."cakeId"
        WHERE ${COLLECTIONS.CLIENTS}.id = $1`,
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