import { STATUS_CODE } from '../enums/statusCode.js';
import { COLLECTIONS } from '../enums/collections.js';
import * as cakesRepository from '../repository/cakesRepository.js';

async function postCake(req, res) {
  const { name, price, image, description } = req.body;

  try {

    res.status(STATUS_CODE.SUCCESSOK);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

async function postFlavour(req, res) {
  const { any } = req.body;

  try {

    res.status(STATUS_CODE.SUCCESSOK).send(body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export {postCake, postFlavour};