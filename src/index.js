require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose= require('mongoose');
const cors = require("cors")


const app = express();
app.use(bodyParser.json());
app.use(cors())
//==================================[Data-Base Connection]==================================================

mongoose.connect(process.env.DATA_BASE, { 
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected successfully"))
.catch ( err => console.log(err) )


//=====================================[Data-Base Connection]=====================================================


app.use('/', route);


app.listen(process.env.PORT, function () {
    console.log('Express app running on port ' + (process.env.PORT ))
});