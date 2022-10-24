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
  const { date } = req.params;
  if(date){
    //YYYY-MM-DD
  }
  try {
    const Orders = await ordersRepository.getOrders();
    const body = 
    [
      Orders.rows
    ]
    return res.send(body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}
async function getOrder(req, res) {
  const { id } = req.params;
  if(isNaN(parseInt(id))) return res.sendStatus(STATUS_CODE.ERRORUNPROCESSABLEENTITY);
  try {
    const Order = await ordersRepository.getOrder(id);
    const body = 
    [
      Order.rows
    ]
    return res.status(STATUS_CODE.SUCCESSOK).send(body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

async function patchOrder(req, res) {
  const { id } = req.params;
  if(isNaN(parseInt(id))) return res.sendStatus(STATUS_CODE.ERRORUNPROCESSABLEENTITY);
  try {
    const Patch = await ordersRepository.patchOrder(id);
    res.sendStatus(STATUS_CODE.SUCCESSNOCONTENT)
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export {postOrder,getOrders,getOrder,patchOrder};