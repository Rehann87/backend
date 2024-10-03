const mongoose = require('mongoose')
const DB_URL = "mongodb+srv://rehann_30:uF7o5aZick5hw2TE@database-serverr.jutqbmo.mongodb.net/Practice";

mongoose
.connect(DB_URL)
.then((dbres)=>{
    console.log('Database connected')
}).catch((err)=>{
    console.log('error', err)
})