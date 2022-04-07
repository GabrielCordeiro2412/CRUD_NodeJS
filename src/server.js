const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json())

require('./controllers/UserController')(app)

app.listen(3000, () =>{
    console.log('listening on port 3000')
});