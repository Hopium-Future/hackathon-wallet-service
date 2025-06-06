const axios = require('axios')
const Promise = require('bluebird')
const Logger = use('Logger')
const Redis = use('Redis').connection('cache')

exports.notify = async function notify(message, options = {
    toSlack: true,
    toNamiAssistant: true,
    toSlackContest: false,
    toSlackExchange: false,
    toSlackFuture: false,
	toSlackCopyTrade: false,
    toSlackMention: []
}) {
    try {
        const promises = []
        let mentionText = ''
        if (options.toSlackMention && options.toSlackMention.length){
            options.toSlackMention.map(mention =>{
                mentionText+= mention
            })
        }


		if (options.toSlackExchange && process.env.EXCHANGE_NOTIFY_SLACK_URL) {
			promises.push(axios.post(process.env.EXCHANGE_NOTIFY_SLACK_URL,  {
				text: mentionText+message
			}))
		} else if (options.toSlackFuture && process.env.SLACK_NAMI_FUTURE_NOTI) {
			promises.push(axios.post(process.env.SLACK_NAMI_FUTURE_NOTI,  {
				text: mentionText+message
			}))
		} else if (options.toSlackCopyTrade && process.env.SLACK_NAMI_COPY_TRADE_NOTI) {
			promises.push(axios.post(process.env.SLACK_NAMI_COPY_TRADE_NOTI,  {
				text: mentionText+message
			}))
		} else if (options.toSlackContest && process.env.SLACK_CONTEST_NOTIFICATION_API) {
			promises.push(axios.post(process.env.SLACK_CONTEST_NOTIFICATION_API,  {
				text: mentionText+message
			}))
		} else if (options.toSlack && process.env.NOTIFY_SLACK_URL) {
            promises.push(axios.post(process.env.NOTIFY_SLACK_URL, {
                text: mentionText+message
            }))
        }

        if (options.toNamiAssistant && process.env.NOTIFY_NAMI_ASS_URL) {
            promises.push(axios.post(process.env.NOTIFY_NAMI_ASS_URL,  {
                text: 'nami.trade.admin',
                content: message
            }))
        }

        await Promise.all(promises)

		Logger.info('SysNoti', message)
    } catch (e) {
        Logger.error('SysNoti error:', e)
    }

}

exports.sendMessenger = async function (user_id, text) {
    user_id = +user_id
    return await axios.post(process.env.NOTIFY_NAMI_ASS_URL, {
        user_id, text
    })
}

exports.markTime = async function lastTimeNotify(category, value) {
    if (value != null) {
        await Redis.hset('deposit::transfer_to_root_notify_time', category, value)
    } else {
        const val = await Redis.hget('deposit::transfer_to_root_notify_time', category)
        if (val == null) return 0
        else return +val
    }
}
