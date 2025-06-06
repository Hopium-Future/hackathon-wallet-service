const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");
const Helpers = use('Helpers');
const path = require('path');
const Logger = use('Logger');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash')
const {createRollbackWallet} = require("../app/Services/GrpcHandler");
const {createGetWallet} = require("../app/Services/GrpcHandler");
const {createGetSomethingOfWallet} = require("../app/Services/GrpcHandler");
const {createGenTransactionId} = require("../app/Services/GrpcHandler");
const {createChangeBalance} = require("../app/Services/GrpcHandler");

const proto = protoLoader.loadSync(path.join(Helpers.appRoot(), '../na3-interface/proto', 'wallet.proto'));
const definition = grpc.loadPackageDefinition(proto);

function getServer() {
    const server = new grpc.Server({
        'grpc-node.max_session_memory': 50,
    });
    server.addService(definition.Wallet.service, {
        changeBalance: createChangeBalance(),
        genTransactionId: createGenTransactionId(),
        getAvailable: createGetSomethingOfWallet('getAvailable'),
        getLocked: createGetSomethingOfWallet('getLocked'),
        getBalance: createGetSomethingOfWallet('getBalance'),
        getWallet: createGetWallet(),
        rollbackWallet: createRollbackWallet(),
    });
    return server;
}
var routeServer = getServer();
routeServer.bindAsync('0.0.0.0:' + process.env.GRPC_PORT, grpc.ServerCredentials.createInsecure(), (e) => {
    if (e) {
        Logger.error('Start GRPC server error', e);
    } else {
        Logger.info('GRPC server started on port ' + process.env.GRPC_PORT);
        routeServer.start();
    }
});

const parseDateToRpc = function (date) {
    if (!date) {
        return null;
    } else if (date instanceof Date) {
        return date.getTime();
    } else {
        return new Date(date).getTime();
    }
}
