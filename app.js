const express = require('express'),
    app = express();


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/do', (req, res) => {
    res.render('main');
});


app.listen(8080, function() {
    console.log("Serving!");
})