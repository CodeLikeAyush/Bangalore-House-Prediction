const express = require('express')
const app = express()

const { spawn } = require('child_process');

const multer = require('multer')
const upload = multer()

const path = require('path');

const port = 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))


app.get('/', function (req, res) {
    res.cookie('locations', 'value', { maxAge: 900000, httpOnly: true });
    res.render('index');
});

app.post('/predict', upload.fields([]), (req, res) => {
    // console.log(req.body)
    // spawn new child process to call the python script
    const python = spawn('python', ['prediction.py', req.body.location, req.body.area, req.body.bathroom, req.body.bhk]);

    // collecting data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        // sending data to client
        // console.log(JSON.parse(`{${data.toString().replace(/[\n\r]/g, "")}}`))
        res.json(JSON.parse(`{${data.toString().replace(/[\n\r]/g, "")}}`))
    });
    python.on('error', (err) => {
        console.error('Failed to start subprocess:', err);
    });
    python.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });


});

app.listen(port, () => console.log(`server is running on port ${port}`))
