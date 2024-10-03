require('dotenv').config();
const cors = require("cors")
const express = require("express")
const app = express()

app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors())
const router = require("./Api/route")
app.use("/" , router)
require("./db")


app.listen(3000, ()=>{
    console.log("server is running on port 3000")
  })

// Protected route (optional)
app.get('/protected', (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.json({ message: 'Protected route accessed', userId: decoded.userId });
  } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
  }
});


module.exports = app

