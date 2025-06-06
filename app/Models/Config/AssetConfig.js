'use strict'

const BaseModel = use('App/Models/BaseModel')

const MemoryCache = use('App/Models/MemoryCache')
const cache = new MemoryCache(5 * 60) // Create a new cache service instance
/**
 * @class AssetConfig
 */
class AssetConfig extends BaseModel {
    /**
     * Asset's schema
     */
    static get schema () {
        return {
            id: Number,
            status: { type: Boolean, default: true },
            assetCode: String,
            assetDigit: Number,
            assetName: String,
            commissionRate: Number,
            feeDigit: Number,
            feeRate: Number,
            feeReferenceAsset: String,
            fullLogoUrl: String,
            gas: Number,
            isLegalMoney: Boolean,
            logoUrl: String,
            s3LogoUrl: String,
            s3LogoUrls: Object,
            tags: Object,
            walletTypes: Object, // {MAIN: true, FUTURES: true},
            coinMarketCapData: Object,
            coinGeckoData: Object,
            displayWeight: Number,
            enableSignal: { type: Boolean, default: false },
            displayDigit: { type: Number, default: 8 },
            cmcMetadata: { type: Object, select: false }
        }
    }

    static async clearMemoryCache () {
        const pattern = this.getModelName()
        cache.delKeys(pattern)
        await this.resetCache()
    }

    static async getOneCached (options = {}) {
        const _key = this.buildCacheKey("getOneCached", arguments)// tạo key redis
        return cache.get(_key, async () => this.getOne(options))
    }

    static async getListCached (options = {}, select, sort) {
        const _key = this.buildCacheKey("getListCached", arguments)// tạo key redis
        return cache.get(_key, async () => this.getList(options, select, sort))
    }

    static async getOne (options = {}) {
        const [item] = await this.getList(options, null, null, 0, 1)
        return item
    }

    // eslint-disable-next-line no-unused-vars
    static async getList (options = {}, select, sort, pageIndex = 0, pageSize = 0) {
        // eslint-disable-next-line prefer-rest-params
        const _key = this.buildCacheKey("getList", arguments)// tạo key redis
        const _cData = await this.getCacheData(_key)
        if (_cData) {
            return _cData
        }


        let query = this.find(options);
        if (select) {
            query = query.select(select);
        }
        if (sort) {
            query = query.sort(sort);
        }
        if (pageIndex && pageSize) {
            query = query.skip(pageIndex * pageSize);
        }
        if (pageSize > 0) {
            query = query.limit(pageSize);
        }
        const result = await query.lean();
        await this.setCacheData(_key, result, 10 * 60 * 1000)
        return result
    }
}

module.exports = AssetConfig.buildModel('AssetConfig')
