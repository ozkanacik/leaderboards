
//import libs
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser')


//import controller
var userController = require('./controller/userController');
var a = require('./model/totalScore');

//settings
var app = express();

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/leaderboards');

app.get("/",(req,res)=>{

    res.render(__dirname + '/view/index.html');
})

app.get("/getUser",(req,res)=>{
    id="5c9219fbec9f102ae04f02f3";




      
})

app.get("/leaderboards",(req,res)=>{
    id="5c9219fbec9f102ae04f02f3";


    userController.leaderboardList(id,(data)=>{
        res.render(__dirname + '/view/board.html', {
            prs: data
        });
    })
      
})

app.get("/setUser",(req,res)=>{
     
   
    
   
   userController.setUser();

    
       
res.end("req");
})








//server port settings
app.listen(80, ()=> {
    console.log("80");
})