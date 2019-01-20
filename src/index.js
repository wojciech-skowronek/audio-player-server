const restify = require('restify');
const socketio = require('socket.io');
const corsMiddleware = require('restify-cors-middleware')
const models = require("./models")

const server = restify.createServer({
  name: 'audio-player-server',
  version: '1.0.0'
});
var io = socketio.listen(server.server);

// CORS setup
const cors = corsMiddleware({
  origins: ['*'],
})
server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


// Routes
server.get('/tracks', models.tracks.list);
server.get('/playlog', models.playlog.upgrade);

// Websockets
io.sockets.on('connection', models.playlog.upgrade)


server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
