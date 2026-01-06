const express = require('express'); //web server
const cors = require('cors') //Allows access on localhost
const bodyParser = require("body-parser"); //Allows json data in body section

const app = express();
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'] // Specify allowed methods
}));
app.use(bodyParser.json());
const port = 3000;

const message = "hello world!";