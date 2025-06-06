'use strict'

const _ = require("lodash")

const BaseModel = use('App/Models/BaseModel')

const MemoryCache = use('App/Models/MemoryCache')
const cache = new MemoryCache(5 * 60) // Create a new cache service instance

const { User: UserEnum } = use('App/Library/Enum')


class User extends BaseModel {
    static boot ({ schema }) {
    }

    static get schema () {
        return {
              id: Number,
                telegramId: String,
                username: String,
                firstName: String,
                lastName: String,
                avatar: String,
                email: String,
                normalizedEmail: String,
                phone: String,
                gender: String,
                status: String,
                referralId: Number,
                referralCode: String,
                referralDate: Date,
                authenticatorSecret: String,
                partnerType: String,
                dateOfBirth: Date,
                countryCode: String,
        }
    }

    static async getCount (options = {}) {
        return this.count(options)
    }

    static async getOne (options = {}) {
        const [item] = await this.getList(options, 1, 1)
        return item
    }

    // eslint-disable-next-line no-unused-vars
    static async getList (options = {}, pageIndex = 1, pageSize = 10) {
        // eslint-disable-next-line prefer-rest-params
        const _key = this.buildCacheKey("getList", arguments)// tạo key redis
        const _cData = await this.getCacheData(_key)
        if (_cData) {
            return _cData
        }

        const records = await this.find(options).read('s')
        const result = []

        if (records.length > 0) {
            // eslint-disable-next-line no-restricted-syntax
            for (const item of records) {
                result.push(item)
            }
        }
        await this.setCacheData(_key, result)
        return result
    }
}

module.exports = User.buildModel('User')

