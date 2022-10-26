import { STATUS_CODE } from '../enums/statusCode.js';
import * as clientsRepository from '../repository/clientsRepository.js';

async function postClient(req, res) {
  const {name, address, phone } = req.body;
  const clname = name.trim()
  const claddress = address.trim()
  const clphone = phone.trim()
  try {
    await clientsRepository.postNewClient(clname, claddress, clphone);
    res.status(STATUS_CODE.SUCCESSCREATED).send(`Client Boladão Criado`);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

async function getClientList(req, res) {
  const { id } = req.params;
  if(isNaN(parseInt(id))) return res.sendStatus(STATUS_CODE.ERRORUNPROCESSABLEENTITY);
  try {
    const Orders = await clientsRepository.HaveUserOrder(id);
    const Client = await clientsRepository.getClient(id);
    const body = 
    [
      Client.rows,
      Orders.rows
    ]
    return res.status(STATUS_CODE.SUCCESSOK).send(body);
  } catch (error) {
    return res.status(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export {postClient,getClientList};