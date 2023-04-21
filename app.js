
const express = require('express');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors())
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');
app.use(express.static(path.join(__dirname, 'views')))
const Sequelize = require('sequelize');
const db=require('./Config/dbconfig')
const models=require('./routes/models')
const Full =require('./routes/FullUrls')


app.get("/",(req,res)=>{
    res.send("Hii")
})

app.use("/",Full)

app.listen(8080, '0.0.0.0', () => {
    console.log('localhost');
});
