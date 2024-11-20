const express = require ('express')
const app = express()
const bodyParser = require ('body-parser')
const cors = require ('cors')
require ('dotenv').config()
require ('./Models/db')
const useRoute = require ('./Routes/user.router')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, 
    }) )
app.use("/api/v1/user", useRoute)


app.use(bodyParser.json())



app.listen(PORT, ()=>{
    console.log(`Server is listning on ${PORT}`);
    
})