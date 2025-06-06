const RedisSocket = use('Redis').connection('user_socket')

class SocketService {
    static async emitToUser(userId, event, data) {
        return RedisSocket.publish('socket:emit:user', JSON.stringify({data: {event, data, userId}}), (err, count) => {
            if (err) {
                console.error('Error publishing event:', err);
            } else {
                console.log(`Event published to ${count} subscribers.`);
            }
        });
    }

    static async emitAll(event, data) {
        return RedisSocket.publish('socket:emit', JSON.stringify({
            event, data
        }), (err, count) => {
            if (err) {
                console.error('Error publishing event:', err);
            } else {
                console.log(`Event published to ${count} subscribers.`);
            }
        });
    }
}

module.exports = SocketService
