import { Sequelize } from "sequelize";
import { sequelize } from "../DB/db.js";

export const category = sequelize.define('category',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    category:Sequelize.STRING,
})