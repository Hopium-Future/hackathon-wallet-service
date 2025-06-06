const { hooks } = require('@adonisjs/ignitor')
const _ = require('lodash')

hooks.after.providersBooted(() => {
    global.Logger = use('Logger');
    use('App/Library/Redis').initRedisCommand();

    bindResponse();
    use('App/Services/CacheService').subscribeChange();
});

hooks.after.httpServer(async () => {
});


function bindResponse() {
    const Response = use('Adonis/Src/Response')

    Response.prototype.sendSuccess = function (data) {
        this.send({
            status: 'success',
            data
        })
    }
    Response.prototype.sendError = function (code = 400, message = null, status = 400, data = null) {
        const responseData = { status: 'error' }
        if (message) responseData.message = message
        if (code) responseData.code = code
        if (data) responseData.data = data
        this.status(status).send(responseData)
    }
    Response.prototype.sendDetailedError = function (obj = {}) {
        const _error = _.defaults(obj, { status: 'error', code: null, data: null, message: null })
        const { code, data, message } = _error
        this.status(_error.status).send({
            status: 'error',
            code,
            data,
            message
        })
    }
}
