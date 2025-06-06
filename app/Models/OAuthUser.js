'use strict'

const BaseModel = use('MongooseModel')

class OAuthUser extends BaseModel {
    static boot ({ schema }) {
        // Hooks:
        // this.addHook('preSave', () => {})
        // Indexes:
        // Virtuals, etc:
        // schema.virtual('something').get(.......)
    }

    static get schema () {
        return {
            type: Number,
            auth_id: String,
            name: String,
            phone: String,
            gender: String,
            first_name: String,
            last_name: String,
            middle_name: String,
            name_format: String,
            avatar: String,
            access_token: String,
            metadata: String
        }
    }
}

module.exports = OAuthUser.buildModel('OAuthUser')
