import { STATUS_CODE } from '../enums/statusCode.js';
import * as ordersRepository from '../repository/ordersRepository.js';

async function postOrder(req, res) {
  const {cakeId,clientId,quantity,totalPrice}=req.body;
  if(quantity <= 0|| quantity >5){
    return res.sendStatus(STATUS_CODE.ERRORBADREQUEST);
  }
  try {
    ordersRepository.postNewOrder(cakeId,clientId,quantity,totalPrice);
    res.status(STATUS_CODE.SUCCESSCREATED).send("Order Boladão Criado");
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}
async function getOrders(req, res) {
  try {
    const Orders = await ordersRepository.getOrders();
    return res.status(STATUS_CODE.SUCCESSOK).send(
      Orders.rows.map((order) => {
        return {
          client:{
            id: order.idclient,
            name: order.nameclient,
            address: order.address,
            phone: order.phone
          },
          cake:{
            id: order.id,
            name: order.name,
            flavourId: order.flavourId,
            image: order.image,
            price: order.price,
            description: order.description,
          },
          ordersId: order.ordersId,
          quantity: order.quantity,
          totalPrice: order.totalPrice,
          createdAt: order.createdAt,
          isDelivered: order.isDelivered
        }
      }));
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}
async function getOrder(req, res) {
  const { id } = req.params;
  if(isNaN(parseInt(id))) return res.sendStatus(STATUS_CODE.ERRORUNPROCESSABLEENTITY);
  try {
    const Order = await ordersRepository.getOrder(id);
    if (Order.rowCount <= 0) {
      return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
    }
    return res.status(STATUS_CODE.SUCCESSOK).send(
      Order.rows.map((order) => {
        return {
          client:{
            id: order.id,
            name: order.nameclient,
            address: order.address,
            phone: order.phone
          },
          cake:{
            cakeid: order.cakeid,
            name: order.name,
            flavourId: order.flavourId,
            image: order.image,
            price: order.price,
            description: order.description,
          },
          ordersId: order.ordersid,
          quantity: order.quantity,
          totalPrice: order.totalPrice,
          createdAt: order.createdAt,
          isDelivered: order.isDelivered
        }
      }));
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}
async function patchOrder(req, res) {
  const { id } = req.params;
  if(isNaN(parseInt(id))) return res.sendStatus(STATUS_CODE.ERRORUNPROCESSABLEENTITY);
  try {
    await ordersRepository.patchOrder(id);
    res.sendStatus(STATUS_CODE.SUCCESSNOCONTENT);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export {postOrder,getOrders,getOrder,patchOrder};