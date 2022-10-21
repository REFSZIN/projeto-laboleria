import connection from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function postNewClient(name, phone, address) {
  return connection.query(
    `
    INSERT INTO ${COLLECTIONS.USERS} 
      (name, phone, address)
    VALUES 
      ($1, $2, $3);
  `,
    [`${name}`,`${phone}`,`${address}`]
  );
}

async function HaveUser(id) {
  const list = await connection.query(`
      SELECT * FROM  ${COLLECTIONS.ORDERS} o
      WHERE o.clientId = $1`,
    [`${id}`]
  );
  return list;
}

async function getClient(id) {
  const client = await connection.query(`
      SELECT * FROM  ${COLLECTIONS.CLIENTS} o
      WHERE o.id = $1`,
    [`${id}`]
  );
  if(client.rowCount === 0){
    return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
  }
}

export { postNewClient,getClient,HaveUser};
