const express = require('express')
const app = express()
var cors = require('cors')
var mongoose = require('mongoose');
const port = 3000

app.use(cors())

mongoose.connect('mongodb+srv://mrclay:myP@ssw0rd@gravador-qools.mongodb.net/test', {
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

//var silence = new Kitten({ name: 'Silence' });

app.put('/create', function(req, res) {
    req.on('data', function(datas) {
        let data = JSON.parse(datas)
        let title = data.title
        let content = data.content
        var newcon = new postItem({ title: title, connect: content })
        newcon.save(function(err, newcon, numAffected) {
            if (err) return console.error(err);
            console.log(newcon)
            console.log(numAffected)
        });
    })
    res.send("saved")
})


app.listen(port, function() {
    console.log("listing to : " + port)
})