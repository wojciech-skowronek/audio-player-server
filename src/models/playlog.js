const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const ee = new MyEmitter();

const playlog = {

    upgrade: async (socket) => {
        socket.on('play', function (data) {
            ee.emit("playlog-update", data);
        });

        ee.on("playlog-update", (data) => {
            socket.emit('playlog-update', data);
        })
    }

}

module.exports = playlog
