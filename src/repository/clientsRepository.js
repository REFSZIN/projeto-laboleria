import connection from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function postNewClient(name, phone, address) {
  return connection.query(
    `
    INSERT INTO ${COLLECTIONS.CLIENTS} 
      (name, phone, address)
    VALUES 
      ($1, $2, $3);
  `,
    [`${name}`,`${phone}`,`${address}`]
  );
}

async function HaveUserOrder(id) {
  const list = await connection.query(`
      SELECT * FROM  ${COLLECTIONS.ORDERS}
      WHERE "clientId" = $1`,
    [`${id}`]
  );
  return list;
}

async function getClient(id) {
  const client = await connection.query(`
      SELECT * FROM ${COLLECTIONS.CLIENTS} 
      WHERE id = $1`,
    [`${id}`]
  );
  if(client.rowCount === 0){
    return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
  }
  return client;
}

export { postNewClient,getClient,HaveUserOrder};
