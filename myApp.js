let express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
let app = express();
/* console.log("Hello World"); */
const path = __dirname + '/public';

bodyParser.urlencoded({extended: false});
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

app.use('/public', express.static(path));
app.get('/json', (req, res)=>{
    if(process.env.MESSAGE_STYLE === "uppercase"){
        res.json({"message": "HELLO JSON"});
    }
    res.json({"message": "Hello json"});

});
app.get('/', (req, res) => {
    absolutePath = __dirname + '/views/index.html';

    /*res.send("Hello Express")*/
    res.sendFile(absolutePath);
});

app.get('/now', (req, res, next) =>{
    req.time = new Date().toString();
    next();
},(req, res) =>{
    res.json({time: req.time});
});

app.get('/:word/echo',  (req, res)=>{
    res.json({echo: req.params.word})
})

app.route('/name').get((req, res)=>{
    res.json({name: `${req.query.first} ${req.query.last}`});
});

































 module.exports = app;
