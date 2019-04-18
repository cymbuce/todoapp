var express=require('express');
var app=express();
app.set('view engine','ejs');
app.use('/public',express.static('public'));
var todoController=require('./controller/todoController');
todoController(app);
app.listen(3000);