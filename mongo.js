const express = require('express')
const app = express()
var cors = require('cors')
var mongoose = require('mongoose');
const port = 3000

app.use(cors())

mongoose.connect('mongodb+srv://mrclay:myP@ssw0rd@gravador-qools.mongodb.net/aismongo', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log("Database is Connected")
}).catch(err => {
    console.log(err)
})


var mypost = new mongoose.Schema({
    title: String,
    content: String
});

var postItem = mongoose.model('postItem', mypost);
//get-data/all
app.put('/create', function(req, res) {
    req.on('data', function(datas) {
        let data = JSON.parse(datas)
        let title = data.title
        let content = data.content
        var newcon = new postItem({
            title: title,
            content: content
        })
        newcon.save(function(err, newcon, numAffected) {
            if (err) return console.error(err);
            console.log(newcon)
            console.log(numAffected)
        });
    })
    res.send("saved")
})

app.get('/get-data/all', function(req, res) {
    var query = postItem.find()
    query.exec(function(err, docs) {
        console.log(docs)
        res.send(docs)
    });

})

app.post('/get-data/:id', function(req, res) {
    let id = req.params.id;
    var query = postItem.find({
        _id: id
    })
    query.exec(function(err, docs) {
        console.log("single doc=" + docs)
        res.send(docs)
    });
})

app.post('/update/:id', function(req, res) {
    req.on('data', function(data) {
        let datai = JSON.parse(data);
        let id = req.params.id
        var query = postItem.find({
            _id: id
        })
        query.exec(function(err, docs) {
            console.log("single doc=" + docs)
            res.send(docs)
        });
    })
    res.send("updated")

})
app.listen(port, function() {
    console.log("listing to : " + port)
})