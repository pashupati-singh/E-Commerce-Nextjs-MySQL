
import express from "express"
import { sequelize } from "./DB/db.js";
import { AuthRoutes } from "./Routes/Auth.routes.js";

const app = express();
app.use(express.json());

app.use('/users',AuthRoutes)

app.get('/',(req,res)=>{
    res.json("helo");
})





sequelize.sync().then(()=>console.log("dataBase connected")).catch((err)=>console.log(err))


app.listen(8080,async()=>{
    console.log("server is connected");
})