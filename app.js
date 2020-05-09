const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const nexmo = require('nexmo');
const socketio = require('socket.io');

const app = express();

//init nexmo
const Nexmo = new nexmo({
    apiKey: '0c1a3390',
    apiSecret: 'zXijbMf0czWnXjaJ'
}, { debug: true });

//init app
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//public folder setup
app.use(express.static(__dirname + '/public'));

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {
    const number = req.body.number;
    const text = req.body.text;
    Nexmo.message.sendSms('919964008340', number, text, { type: 'unicode' },
        (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                console.dir(responseData);
            }
            // const data = {
            //     id: responseData.message[0]['message-id'],
            //     number: responseData.message[0]['to']
            // }
            // io.emit('smsStatus', data)
        }
    );
})


//create a port

const port = 3000;

const server = app.listen(port, () => console.log(`Server startd at port number ${port}`));


const io = socketio(server);

io.on('connection', (socket) => {
    console.log('connected');
    io.on('disconnect', () => {
        console.log('disconnected');
    })
})






