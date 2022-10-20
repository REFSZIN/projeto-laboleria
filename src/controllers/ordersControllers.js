import { STATUS_CODE } from '../enums/statusCode.js';
import { COLLECTIONS } from '../enums/collections.js';
import * as ordersRepository from '../repository/ordersRepository.js';


async function postOrder(req, res) {
  const { any } = req.body;

  try {

    res.status(STATUS_CODE.SUCCESSOK).send(body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}
async function getOrders(req, res) {
  const { any } = req.body;

  try {

    res.status(STATUS_CODE.SUCCESSOK).send(body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}
async function getOrder(req, res) {
  const { any } = req.body;

  try {

    res.status(STATUS_CODE.SUCCESSOK).send(body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}
async function patchOrder(req, res) {
  const { any } = req.body;

  try {

    res.status(STATUS_CODE.SUCCESSOK).send(body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export {postOrder,getOrders,getOrder,patchOrder};