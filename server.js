// Operacje CRUD na pliku express.json.
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

var stringifyFile;

app.use(bodyParser.json());

app.get('/getNote', function (req, res) {
    // Wczytanie pliku.
    fs.readFile('./express.json', 'utf-8', function (err, data) {
        if (err) throw err;
        // Przypisanie zawarotści express.json do zmiennej.
        stringifyFile = data;
        console.log('File read!');
        res.send(data);
    });
});

app.post('/updateNote/:note', function (req, res) {
    // Wczytanie pliku.
    fs.readFile('./express.json', 'utf-8', function (err, data) {
        stringifyFile = data + req.params.note;
        // Dopisanie wartości :note do pliku express.js
        fs.writeFile('./express.json', stringifyFile, function (err) {
            if (err) throw err;
            console.log('File updated');
            res.send(stringifyFile);
        });
    });
});

app.use(function (req, res, next) {
    res.status(404).send('Nie odnaleziono żądania')
})
// Server
app.listen(3000);
