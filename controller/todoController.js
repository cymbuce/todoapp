var bodyParser=require('body-parser');
var urlencodeParser=bodyParser.urlencoded({extended:false});
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/todoapp');
var todoSchema=new mongoose.Schema({
    item:String
});

var todoapp=mongoose.model('todoapp',todoSchema);


// todoapp({item:'Hello Everyone'}).save(function (err,data){
//     if (err) throw err;
//     console.log('item saved')
// });

// var data=[{item:"这是第一段话。"},
// {item:"这是第二段话。"},
// {item:"123"},
// ];

module.exports=function (app){
    app.get('/todo',function (req,res){
        todoapp.find({},function (err,data){
            if (err) throw err;
            res.render('todo',{todos:data});
        })
        
    });
    app.post('/todo',urlencodeParser,function (req,res){
        todoapp(req.body).save(function (err,data){
            if (err) throw err;
            res.json(data);
        });
    });
    app.delete('/todo/:g',function (req,res){
        todoapp.find({item:req.params.g}).remove(function (err,data){
            if (err) throw err;
            res.json(data);
        });
        // data=data.filter(function (todo){
        //     return req.params.g !== todo.item;
        // });
        // res.json(data);
    });
}
