const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors({
    origin: "*"
}))

var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "helpdesk_tickets"
});

con.connect(function(err) {
    if (err) throw err;
});

app.get('/get_categories', (req, res) => {
        con.query("SELECT * FROM categories", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
});
app.get('/get_priorities', (req, res) => {
        con.query("SELECT * FROM priorities", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
});
app.get('/get_tickets', (req, res) => {
        con.query("SELECT * FROM tickets", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
});

app.post('/create', (req, res) => {
        var id_ = req.body["id"];
        var title = req.body["title"];
        var category = req.body["category"];
        var priority = req.body["priority"];
        var description = req.body["description"];
        var status_ = req.body["status"];
        var date_time = req.body["date_time"];
        var created_by = req.body["created_by"];
        var last_modified_time = req.body["last_modified_time"];
        var last_modified_by = req.body["last_modified_by"];
        var assigned_to = req.body["assigned_to"];
        sql = "INSERT INTO `tickets` (`id`, `title`, `category`, `priority`, `description`, `status`, `date_time`, `created_by`, `last_modified_time`, `last_modified_by`, `assigned_to`) VALUES ('"+id_+"', '"+title+"', '"+category+"', '"+priority+"', '"+description+"', '"+status_+"', '"+date_time+"', '"+created_by+"', '"+last_modified_time+"', '"+last_modified_by+"', '"+assigned_to+"');";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
});


app.listen(port, () => {
  console.log(`Server Is Running On Port ${port}`)
})

