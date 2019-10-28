const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mypost'
})

var list = []
app.use(cors())
app.post('/get-data/:id', function(req, res) {
    let id = req.params.id;
    let statement = `SELECT * FROM tblpost WHERE IDPost = ${id}`
    connection.query(statement, function(err, result, fields) {
        if (err) throw err

        let con = { IDPost: result[0].IDPost, Title: result[0].Title, Content: result[0].Content }
        res.send(con)
        console.log(con)
    })
})
app.post('/update/:id', function(req, res) {
    req.on('data', function(data) {
        let datai = JSON.parse(data);
        let id = req.params.id
        let query = `UPDATE tblpost SET Title='${datai.title}',Content='${datai.content}' WHERE IDPost = ${id}`
        connection.query(query, function(err, result, fields) {
            if (err) throw err
        })
    })
    res.send("updated")

})
app.put('/create', function(req, res) {
    req.on('data', function(datas) {
        let data = JSON.parse(datas)

        let title = data.title
        let content = data.content
            //connection.connect()
        let statement = `INSERT INTO tblpost(Title, Content) VALUES ('${title}','${content}')`
        connection.query(statement, function(err) {
            if (err) throw err
        })
    })
    res.send("saved")
})

app.get('/get-data/all', function(req, res) {
    let statement = `SELECT * FROM tblpost WHERE 1`

    connection.query(statement, function(err, result, fields) {
        if (err) throw err
        var con = []
        for (let i = 0; i < result.length; ++i) {
            con.push({ IDPost: result[i].IDPost, Title: result[i].Title, Content: result[i].Content })
        }
        res.send(con)
        console.log(con)
    })
})

app.delete('/delete/:id', function(req, res) {
    let statement = `DELETE FROM tblpost WHERE IDPost = ${req.params.id}`
    console.log("enter delete app")
    connection.query(statement, 1, (error, results, fields) => {
        if (error)
            return console.error(error.message);

        res.send(req.params.id)
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))