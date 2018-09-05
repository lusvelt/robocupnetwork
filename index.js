const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const io = require('socket.io');

require('./server/config/config');

const router = require('./server/config/router');
const database = require('./server/config/database');

const port = process.env.PORT;
const publicPath = path.join('public/dist');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(publicPath));

router.initialize(app);
database.initialize();

server.listen(port, () => console.log('Server attivo'));