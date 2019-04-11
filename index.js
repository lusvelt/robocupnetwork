const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const socketio = require('socket.io');
const fs = require('fs');
const https = require('https');

const args = require('./server/config/yargs');
const config = require('./server/config/config');
const log = require('./server/config/logger');

config(args);

const router = require('./server/config/router');
const database = require('./server/config/database');
const passportJwtStrategy = require('./server/auth/strategies/passportJwt');
const socketioJwtStrategy = require('./server/auth/strategies/socketioJwt');
const sockets = require('./server/config/sockets');

const port = process.env.PORT;
const distPath = path.join(__dirname, 'dist');

const app = express();
const redirect = express();

let server;
let redirectServer;

if (process.env.SSL) {
    const options = {
        key: fs.readFileSync('/etc/letsencrypt/live/robocupnetwork.it/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/robocupnetwork.it/fullchain.pem')
    };
    server = https.createServer(options, app);
    redirectServer = http.createServer(redirect);
} else
    server = http.createServer(app);

const io = socketio(server);

app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(distPath));

passport.use(passportJwtStrategy);

router.initialize(app, passport);
sockets.initialize(io, socketioJwtStrategy);

console.log();

if (process.env.SSL) {
    const redirectFromPort = process.env.REDIRECT_FROM_PORT;
    const redirectToHttps = require('./server/routes/redirect');
    redirect.get('*', redirectToHttps);
    redirectServer.listen(redirectFromPort, () => log.info('Redirection to https enabled'));
}

database.initialize(args)
    .then(() => server.listen(port, () => log.info('Server is listening on port ' + port)));

