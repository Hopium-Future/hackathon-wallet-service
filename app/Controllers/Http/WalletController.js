'use strict'

const TransactionHistory = use('App/Models/TransactionHistory')
const TransactionCategory = use('App/Models/TransactionCategory')
const AssetConfig = use('App/Models/Config/AssetConfig')
const {WalletType} = use('App/Library/Enum').Wallet
const _ = require('lodash')
const Wallet = use('App/Models/Wallet')
const WalletCurrencies = use("Config")
    .get("currencies")

class WalletController {
    async getCategory({request, response}) {
        const categories = await TransactionCategory.getAllCached()
        return response.sendSuccess(categories)
    }

    async getDetailWallet(userId, currency, type) {
        let balance = {};

        if (currency) {
            balance[currency] = await Wallet.getOrCreateWallet(userId, currency);
        } else {
            let assetConfigs = await AssetConfig.getListCached({status: true, 'walletTypes.MAIN': true})
            let listCurrency = assetConfigs.map(item => item.id)
            await Promise.all(listCurrency.map(c => {
                return Wallet.getOrCreateWallet(userId, c).then(b => {
                    balance[c] = b;
                });
            }));
            if(!balance.hasOwnProperty(WalletCurrencies.HOPIUM)){
                balance[WalletCurrencies.HOPIUM] = await Wallet.getOrCreateWallet(userId, WalletCurrencies.HOPIUM);
            }
        }
        return balance
    }

    async getBalance({user, request, response}) {
        try {
            let {currency} = request.get();
            return response.sendSuccess(await this.getDetailWallet(user.id, currency))
        } catch (e) {
            Logger.error('getBalance ERROR ', e);
            return response.sendError();
        }
    }

    async getHistory({request, response, user}) {
        try {
            const {
                skip,
                limit,
                from,
                to,
                currency,
                type,
                category,
                isNegative,
                walletType,
            } = request.get();
            let sort = request.get();

            const filter = {
                userId: user.id,
                mainBalance: 1,
                walletType: WalletType.MAIN,
            };

            if (currency) filter.currency = currency;
            if (from)
                filter.createdAt = {
                    ...filter.createdAt,
                    $gte: new Date(from),
                };
            if (to)
                filter.createdAt = {
                    ...filter.createdAt,
                    $lte: new Date(to),
                };

            if (isNegative === false)
                filter.moneyUse = {
                    $gt: 0,
                };
            if (isNegative === true)
                filter.moneyUse = {
                    $lt: 0,
                };

            if (category || Number(category) === 0) filter.category = category;

            if (_.isNumber(walletType)) {
                filter.walletType = walletType;
            }

            if (sort?.createdAt) sort = null;

            const result = await TransactionHistory
                .find(filter)
                .select('-__v -updated_at -meta_data')
                .sort(sort ?? {createdAt: -1})
                .skip(skip ?? 0)
                .limit(limit ? limit + 1 : 0)
                .read('secondary')
                .lean()
                .exec();
            const hasNext = result.length > limit;
            return response.sendSuccess({
                result: result.slice(0, limit),
                hasNext,
            })
        } catch (e) {
            return response.sendError()
        }

    }
}

module.exports = WalletController
