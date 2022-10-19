import connection from '../db/db.js';
import * as ordersRepository from './ordersRepository.js';

async function getUrl(shortUrl) {
  const result = await connection.query(
    `SELECT * FROM shortens WHERE shorturl = $1;`,
    [shortUrl]
  );

  if (result.rowCount > 0) {
    const shortId = result.rows[0].id;
    ordersRepository.upsertVisit(shortId);
  }

  return result;
}

export { getUrl };