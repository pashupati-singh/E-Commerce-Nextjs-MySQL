
import express from "express"
import { sequelize } from "./DB/db.js";
import { AuthRoutes } from "./Routes/Auth.routes.js";
import { categoryRoutes } from "./Routes/Category.routes.js";
import { users } from "./Models/Signup.model.js";
import UserFavouriteCategory from "./Models/UsersCatergory.model.js";

const app = express();
app.use(express.json());

app.use('/users',AuthRoutes)
app.use('/category',categoryRoutes)


users.hasMany(UserFavouriteCategory, { onDelete: 'CASCADE' });
UserFavouriteCategory.belongsTo(users);

app.get('/',(req,res)=>{
    res.json("helo");
})
 

sequelize.sync().then(()=>console.log("dataBase connected")).catch((err)=>console.log(err))


app.listen(8080,async()=>{
    console.log("server is connected");
})