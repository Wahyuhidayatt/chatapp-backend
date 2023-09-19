const express = require('express');
const app = express();
const server = require('http').createServer(app)
let cors = require('cors')

const io = require('socket.io')(server,{
    cors: {
        origin: '*',
      }
})

const bodyParser = require('body-parser');
const { randomUUID } = require('crypto');

app.use(cors());
app.use(bodyParser.json());

io.on('connection', (socket) => {
    console.log('User Connected');
    socket.on('disconnect', () => console.log('User Disconnected'));
});

app.post('/sendMessage', function(req, res){
    let data = req.body;
    io.sockets.emit('getMessage', {
        userId: data.userId,
        username: data.username,
        message: data.message,
        date: new Date(),
    });
    res.send(data);
});

app.get('/getUserId', function(req, res){
    res.send({
        id: randomUUID()
    })
})

server.listen(3000);