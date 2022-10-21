import connection from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';

async function postNewCake(image,name,flavourId,price,description) {
  return connection.query(
    `
    INSERT INTO ${COLLECTIONS.USERS} 
      (image, name, flavourId, price, description)
    VALUES 
      ($1, $2, $3, $4, $5);
  `,
    [`${image}`,`${name}`,`${flavourId}`,`${price}`,`${description}`]
  );
}
async function postNewFlavours(name) {
  return connection.query(
    `
    INSERT INTO ${COLLECTIONS.FLAVOURS} 
      (name)
    VALUES 
      ($1);
  `,
    [`${name}`]
  );
}

export { postNewCake,postNewFlavours };