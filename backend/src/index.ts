import express from "express";
import routes from "./routes";
import path from "path";
import connect from "./database/connect";
import cors from 'cors';
import cookiePharser from 'cookie-parser'
const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json())
app.use(cors())
app.use(cookiePharser(process.env.COOKIE_SECRET));

connect();

app.use(express.urlencoded({
    extended: false
}));


app.use(routes)
 

app.listen(PORT , ()=>{
    console.log(`Server Listening at port ${PORT}`)
})