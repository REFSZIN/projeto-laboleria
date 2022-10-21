import { STATUS_CODE } from '../enums/statusCode.js';
import * as cakesRepository from '../repository/cakesRepository.js';

async function postCake(req, res) {
  const { name, price, image, description,flavourId } = req.locals.cake;
  try {
    await cakesRepository.postNewCake(name, price, image, description,flavourId);
    res.status(STATUS_CODE.SUCCESSCREATED).send(`Bolo Boladão Criado`);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

async function postFlavour(req, res) {
  const { name } = req.locals.flavour;
  try {
    await cakesRepository.postNewFlavours(name);
    res.status(STATUS_CODE.SUCCESSCREATED).send(`Sabor Boladão Criado`);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export {postCake, postFlavour};