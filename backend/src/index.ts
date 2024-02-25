import express from "express";
import routes from "./routes";
import path from "path";
import connect from "./database/connect";
const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json())


connect();

app.use(express.urlencoded({
    extended: false
}));


app.use(routes)
 

app.listen(PORT , ()=>{
    console.log(`Server Listening at port ${PORT}`)
})