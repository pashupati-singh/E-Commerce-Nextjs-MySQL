import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config()

export const sequelize = new Sequelize("turnover","root",process.env.PASSWORD,{
    dialect:'mysql',
    host:"localhost"
})