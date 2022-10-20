import { STATUS_CODE } from '../enums/statusCode.js';
import { COLLECTIONS } from '../enums/collections.js';
import * as clientsRepository from '../repository/clientsRepository.js';

async function postClient(req, res) {
  const { any } = req.body;

  try {

    res.status(STATUS_CODE.SUCCESSOK).send(body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

async function getClient(req, res) {
  const { any } = req.body;

  try {
    
    res.status(STATUS_CODE.SUCCESSOK).send(body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export {postClient,getClient};