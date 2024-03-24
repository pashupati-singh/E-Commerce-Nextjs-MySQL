import { Sequelize } from "sequelize";
import { sequelize } from "../DB/db.js";

export const users = sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:Sequelize.STRING,
    email: {
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password: Sequelize.STRING,
})

