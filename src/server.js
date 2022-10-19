import express, {json} from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import clientsRouters from "./routers/clients.routers.js";
import ordersRouters from "./routers/orders.routers.js";
import cakesRouters from "./routers/cakes.routers.js";

dotenv.config({path:'../.env'});
const app = express();

app.use(cors());
app.use(json());
app.use(cakesRouters);
app.use(clientsRouters);
app.use(ordersRouters);

app.listen(process.env.PORT, () => { console.log(chalk.green.bold(`Rodando ${process.env.NOMEE} Lisu on Port: ${process.env.PORT}`))});
