import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../build/routes";
const cors = require('cors')

export const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

RegisterRoutes(app);