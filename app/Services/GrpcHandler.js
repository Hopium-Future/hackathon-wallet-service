const { v4: uuidv4 } = require('uuid');
const Logger = use('Logger')
const WalletService = use('App/Services/WalletService');
const Wallet = use('App/Models/Wallet')
const grpc = require('@grpc/grpc-js');
const _ = require('lodash')


exports.createChangeBalance = function () {
    return (call, callback) => {
        const {userId, assetId, valueChange, lockedValueChange, category, note, options} = call.request;
        const uuid = uuidv4();
        Logger.info(`[${uuid}] Received grpc changeBalance`, call.request);
        Logger.info(`[${uuid}] Received grpc changeBalance`, userId, typeof userId, assetId, typeof assetId);
        WalletService.changeBalance(
            +userId,
            assetId,
            valueChange,
            lockedValueChange,
            category,
            note,
            options
        ).then(rawResult => {
            Logger.info(`[${uuid}] Rpc response`, rawResult);
            const result = {
                ...rawResult,
                createdAt: parseDateToRpc(_.get(rawResult, 'createdAt')),
                updatedAt: parseDateToRpc(_.get(rawResult, 'updatedAt')),
            }
            callback(null, result);
        }).catch(err => {
            if (!(err instanceof Error)) {
                callback({
                    message: err,
                    status: grpc.status.INTERNAL
                });
            } else {
                callback(err);
            }
        })
    }
}

exports.createGenTransactionId = function () {
    return (call, callback) => {
        const {prefix} = call.request;
        const uuid = uuidv4();
        Logger.info(`[${uuid}] Received grpc createGenTransactionId`, call.request);
        WalletService.generateTransactionId(
            prefix
        ).then(rawResult => {
            Logger.info(`[${uuid}] Rpc response`, rawResult);
            callback(null, {result: rawResult});
        }).catch(err => {
            if (!(err instanceof Error)) {
                callback({
                    message: err,
                    status: grpc.status.INTERNAL
                });
            } else {
                callback(err);
            }
        })
    }
}

exports.createGetSomethingOfWallet = function (methodName) {
    return (call, callback) => {
        const {userId, assetId, walletType} = call.request;
        const uuid = uuidv4();
        Logger.info(`[${uuid}] Received grpc createGetSomethingOfWallet`, call.request);
        Wallet[methodName](
            +userId, assetId, walletType,
        ).then(rawResult => {
            Logger.info(`[${uuid}] Rpc response`, rawResult);
            callback(null, {result: rawResult});
        }).catch(err => {
            if (!(err instanceof Error)) {
                callback({
                    message: err,
                    status: grpc.status.INTERNAL
                });
            } else {
                callback(err);
            }
        })
    }
}

exports.createGetWallet = function () {
    return (call, callback) => {
        const {userId, assetId, walletType} = call.request;
        const uuid = uuidv4();
        Logger.info(`[${uuid}] Received grpc createGetWallet`, call.request);
        Wallet.getWallet(
            +userId, assetId, walletType,
        ).then(rawResult => {
            Logger.info(`[${uuid}] Rpc response`, rawResult);
            callback(null, rawResult);
        }).catch(err => {
            if (!(err instanceof Error)) {
                callback({
                    message: err,
                    status: grpc.status.INTERNAL
                });
            } else {
                callback(err);
            }
        })
    }
}

exports.createRollbackWallet = function () {
    return (call, callback) => {
        const {transactions} = call.request;
        const uuid = uuidv4();
        Logger.info(`[${uuid}] Received grpc createRollbackWallet`, call.request);
        WalletService.rollbackWallet(
            transactions
        ).then(rawResult => {
            Logger.info(`[${uuid}] Rpc response`, rawResult);
            callback(null, rawResult);
        }).catch(err => {
            if (!(err instanceof Error)) {
                callback({
                    message: err,
                    status: grpc.status.INTERNAL
                });
            } else {
                callback(err);
            }
        })
    }
}

const parseDateToRpc = function (date) {
    if (!date) {
        return null;
    } else if (date instanceof Date) {
        return date.getTime();
    } else {
        return new Date(date).getTime();
    }
}
