import { STATUS_CODE } from '../enums/statusCode.js';
import * as clientsRepository from '../repository/clientsRepository.js';

async function postClient(req, res) {
  const {name, address, phone } = req.locals.client;
  try {
    await clientsRepository.postNewClient(name, address, phone);
    res.status(STATUS_CODE.SUCCESSCREATED).send(`Client Boladão Criado`);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

async function getClientList(req, res) {
  const { id } = req.params;
  if(isNaN(parseInt(id))) return res.sendStatus(STATUS_CODE.ERRORUNPROCESSABLEENTITY);
  try {
    await clientsRepository.HaveUser(id);
    const list = await clientsRepository.getClient(id);
    const body = 
    [
        {
            "orderId": list.rows[0].id,
            "quantity": list.rows[0].quantity,
            "createdAt": list.rows[0].createdAt,
            "totalPrice": list.rows[0].totalPrice,
            "cakeName": list.rows[0].name
        }
    ]
    res.status(STATUS_CODE.SUCCESSOK).send(`List of Client Boladão: `, body);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export {postClient,getClientList};