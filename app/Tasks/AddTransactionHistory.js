'use strict'
const {WalletType, ErrorCode, MoneyType, TransactionStatus} = use('App/Library/Enum').Wallet
const Task = use('Task')
const RedisWallet = use('Redis').connection('wallet')
const QUEUE_REDIS_TRANSACTION_HISTORY = 'queue:history:transaction'
const LIMIT_ADD_TRANSACTION_HISTORY = 5000
const TransactionHistory = use('App/Models/TransactionHistory')
const SysNoti = use('App/Library/SysNoti')
const _ = require('lodash')
const Logger = use('Logger')

class AddTransactionHistory extends Task {
    static get schedule () {
        return '*/10 * * * * *'
    }

    async handle () {
        Logger.info('AddTransactionHistory')
        try {
            const [historiesData, delStatus] = await RedisWallet.multi()
                .lrange(QUEUE_REDIS_TRANSACTION_HISTORY, 0, LIMIT_ADD_TRANSACTION_HISTORY)
                .ltrim(QUEUE_REDIS_TRANSACTION_HISTORY, LIMIT_ADD_TRANSACTION_HISTORY, -1)
                .exec()
            let [historyStatus, histories] = historiesData
            Logger.info(`Add Transaction to DB, length=${histories ? histories.length : 0}`)
            if (histories && histories.length) {
                histories = histories.map(item => JSON.parse(item))
                await TransactionHistory.insertMany(_.reverse(histories), { ordered: false })

                // Cap nhat lai cac transaction bi rollback

                const rollbackTransactions = _.filter(histories, {status: TransactionStatus.ROLLBACK})
                if(rollbackTransactions.length){
                    const rollbackIds = rollbackTransactions.map(item=> item.rollbackTransactionId)
                    await TransactionHistory.updateMany(
                        {
                            transactionId: {$in: rollbackIds}
                        },
                        {
                            status: TransactionStatus.FAILED
                        }
                    )
                }

                Logger.info(`Added ${histories.length} records`)
                Logger.info(`Rollback ${rollbackTransactions.length} records`)
            }
        } catch (e) {
            Logger.error('ADD TRANSACTION HISTORIES ERROR ', e)
            SysNoti.notify(`[SYS] lỗi không ghi được transaction histories vào DB ${e}`, {
                toSlack: true,
                toSlackMention: []
            })
        }
    }
}

module.exports = AddTransactionHistory
