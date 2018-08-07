const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const io = require('socket.io');

const router = require('./server/routing/router');

require('./server/config/config');
const port = process.env.PORT;
const publicPath = path.join('public');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(publicPath));

router.initialize(app);

server.listen(port, () => console.log('Server attivo'));