import connection from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';

async function postNewCake(name, price, image, description, flavourId) {
  try {
    const oi = await connection.query(
      `
      INSERT INTO ${COLLECTIONS.CAKES} 
        (name, price, image, description, "flavourId")
      VALUES 
        ($1, $2, $3, $4, $5);
    `,
      [`${name}`,`${price}`,`${image}`,`${description}`,`${flavourId}`]
    );
    return oi;
    } catch (error) {
      console.error(error);
      return error;
    }
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