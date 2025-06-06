'use strict'


const BaseModel = use('App/Models/BaseModel')

const MemoryCache = use('App/Models/MemoryCache')
const cache = new MemoryCache(5 * 60) // C
// * @class AssetConfig

class TransactionCategory extends BaseModel {
    static get schema () {
        return {
            categoryId: Number,
            content: Object,
            isShow: Boolean,
            priority: Number
        }
    }

    static boot ({ schema }) {
        // Hooks:
        // this.addHook('preSave', () => {})
        // Indexes:
        // Virtuals, etc:
        // schema.virtual('something').get(.......)
    }
    static async getAllCached () {
        const _key = this.buildCacheKey("getAllCategory", arguments)// tạo key redis
        return cache.get(_key, async () => this.getAll())
    }

    static async getAll (options = {}, select, sort) {
        return this.find({isShow: true})
    }
}

module.exports = TransactionCategory.buildModel('TransactionCategory')
