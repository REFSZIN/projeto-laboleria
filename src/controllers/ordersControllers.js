import { STATUS_CODE } from '../enums/statusCode.js';
import * as ordersRepository from '../repository/ordersRepository.js';


async function postOrder(req, res) {
  const {cakeId,clientId,quantity,totalPrice}=req.body;
  try {
    ordersRepository.postNewOrder(cakeId,clientId,quantity,totalPrice);
    res.status(STATUS_CODE.SUCCESSCREATED).send("Order Boladão Criado");
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}
async function getOrders(req, res) {
  const { id } = req.body;
  if(isNaN(parseInt(id))) return res.sendStatus(STATUS_CODE.ERRORUNPROCESSABLEENTITY);
  try {
    ordersRepository.getOrders(id);

    res.status(STATUS_CODE.SUCCESSOK).send(body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}
async function getOrder(req, res) {
  const { id } = req.params;
  if(isNaN(parseInt(id))) return res.sendStatus(STATUS_CODE.ERRORUNPROCESSABLEENTITY);
  try {
    ordersRepository.getOrder(id);

    res.status(STATUS_CODE.SUCCESSOK).send(body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}
async function patchOrder(req, res) {
  const { id } = req.params;
  if(isNaN(parseInt(id))) return res.sendStatus(STATUS_CODE.ERRORUNPROCESSABLEENTITY);
  try {
    ordersRepository.patchOrder(id);
    
    res.status(STATUS_CODE.SUCCESSOK).send(body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export {postOrder,getOrders,getOrder,patchOrder};