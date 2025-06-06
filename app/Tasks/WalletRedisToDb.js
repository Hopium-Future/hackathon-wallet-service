'use strict'

const _ = require('lodash')

const Task = use('Task')
const RedisWallet = use('Redis').connection('wallet')
const WalletService = use('App/Services/WalletService')
const Wallet = use('App/Models/Wallet')

class WalletRedisToDb extends Task {
    static get schedule () {
        // return '15 * * * * *'
        // return '*/10 * * * * *'
        return '45 * * * * *'
    }

    async handle () {
        try {
            Logger.info('UPDATE WALLET REDIS TO DB')

            let walletKeys = await RedisWallet.hgetall(WalletService.KeyChangeBalanceRedis)
            if (walletKeys) {
                walletKeys = Object.keys(walletKeys)
                Logger.info('UPDATE Wallet REDIS TO DB length', walletKeys.length)

                for (let i = 0; i < walletKeys.length; i++) {
                    try {
                        if (!_.isNil(walletKeys[i])) {
                            const hash_key = `${walletKeys[i]}`
                            const [hash, assetId] = hash_key.split('__')
                            // example of key: wallet:1:3:1
                            const params = hash.split(':')
                            if (!params || params.length < 4) return null
                            // wallet:MAIN:LOCK:50786735
                            let [sub, walletType, moneyType, userId] = params
                            userId = +userId
                            // (userId, assetId, walletType = WalletType.MAIN)
                            const wallet = await Wallet.getOrCreateWallet(userId, assetId, walletType)

                            if (wallet != null) {
                                Logger.debug(`Update`, { userId, assetId, walletType }, {
                                    value: wallet.value,
                                    lockedValue: wallet.lockedValue
                                })
                                await Wallet.update({ userId, assetId, walletType }, {
                                    value: wallet.value,
                                    lockedValue: wallet.lockedValue,
                                    updatedAt: new Date()
                                })
                            }

                            await RedisWallet.hdel(WalletService.KeyChangeBalanceRedis, hash_key)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        } catch (e) {
            this.error('Task WalletRedisToDb error', e)
        }
    }
}

module.exports = WalletRedisToDb
