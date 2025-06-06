'use strict'

/*
|--------------------------------------------------------------------------
| Redis Configuaration
|--------------------------------------------------------------------------
|
| Here we define the configuration for redis server. A single application
| can make use of multiple redis connections using the redis provider.
|
*/

const Env = use('Env')

module.exports = {
    /*
    |--------------------------------------------------------------------------
    | connection
    |--------------------------------------------------------------------------
    |
    | Redis connection to be used by default.
    |
    */
    connection: Env.get('REDIS_CONNECTION', 'wallet'),

    /*
    |--------------------------------------------------------------------------
    | local connection config
    |--------------------------------------------------------------------------
    |
    | Configuration for a named connection.
    |
    */
    cache: Env.get('REDIS_CACHE_URL', "redis://default:123456@127.0.0.1:6379/0?allowUsernameInURI=true"),
    locker: Env.get('REDIS_CACHE_URL', "redis://default:123456@127.0.0.1:6379/0?allowUsernameInURI=true"),
    wallet: Env.get('REDIS_WALLET_URL', "redis://default:123456@127.0.0.1:6379/0?allowUsernameInURI=true"),
    local: Env.get('REDIS_URL', "redis://default:123456@127.0.0.1:6379/0?allowUsernameInURI=true"),
    cache_market_maker: Env.get('REDIS_MM_URL', "redis://default:123456@127.0.0.1:6379/0?allowUsernameInURI=true"),
    price_history: Env.get('REDIS_PRICE_HISTORY_URL', "redis://default:123456@127.0.0.1:6379/0?allowUsernameInURI=true"),
    stream_cache: Env.get('REDIS_STREAM_CACHE_URL', "redis://default:123456@127.0.0.1:6379/0?allowUsernameInURI=true"),
    user_socket: Env.get('REDIS_USER_SOCKET_URL', "redis://default:123456@127.0.0.1:6379/0?allowUsernameInURI=true"),
}
