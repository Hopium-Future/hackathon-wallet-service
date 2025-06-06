'use strict'

const {Command} = require('@adonisjs/ace')

class Test extends Command {
    static get signature() {
        return 'test'
    }

    static get description() {
        return 'Tell something helpful about this command'
    }

    async handle(args, options) {
        this.info('Dummy implementation for test command')


        const SocketService = use('App/Services/SocketService')
        await SocketService.emitToUser(37, 'user:update_balance:MAIN', 123);
    }
}

module.exports = Test
