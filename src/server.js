const express = require('express');
const cors = require('cors');
require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb' , extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );

require('./controllers/UserController')(app)

app.listen(3000, () =>{
    console.log('listening on port 3000')
});