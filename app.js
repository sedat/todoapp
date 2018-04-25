
const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost/todo");
mongoose.Promise = Promise;
var todoSchema = new mongoose.Schema({
    todo: String
});

var Todo = mongoose.model("Todo", todoSchema);


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/do', (req, res) => {
    Todo.find({}, function(err, alltodos){
        if(err) {
            console.log("Error");
        } else {
            console.log("render is on");
            res.render('main', {todo: alltodos});
        }
    });
});

app.post('/do', (req, res) => {
    console.log(req.body.todo);
    var postodo = {todo: req.body.todo};

    Todo.create(postodo, function(err, created) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/do');
        }
    });
});

app.post('/delete', function(req, res) {
    Todo.findByIdAndRemove(req.body.id, function(err) {
        if(err) {
            console.log("error deleting");
        } else {
            res.redirect('/do');
        }
    })
})

app.get('/new', (req, res) => {
    res.render('new');
})


app.listen(8080, function() {
    console.log("Serving!");
})