module.exports = {
    CONTINUE: { status: 100, code: 100, message: "CONTINUE" },
    SWITCHING_PROTOCOLS: { status: 101, code: 101, message: "SWITCHING_PROTOCOLS" },
    OK: { status: 200, code: 200, message: "OK" },
    CREATED: { status: 201, code: 201, message: "CREATED" },
    ACCEPTED: { status: 202, code: 202, message: "ACCEPTED" },
    NON_AUTHORITATIVE_INFORMATION: { status: 203, code: 203, message: "NON_AUTHORITATIVE_INFORMATION" },
    NO_CONTENT: { status: 204, code: 204, message: "NO_CONTENT" },
    RESET_CONTENT: { status: 205, code: 205, message: "RESET_CONTENT" },
    PARTIAL_CONTENT: { status: 206, code: 206, message: "PARTIAL_CONTENT" },
    MULTIPLE_CHOICES: { status: 300, code: 300, message: "MULTIPLE_CHOICES" },
    MOVED_PERMANENTLY: { status: 301, code: 301, message: "MOVED_PERMANENTLY" },
    FOUND: { status: 302, code: 302, message: "FOUND" },
    SEE_OTHER: { status: 303, code: 303, message: "SEE_OTHER" },
    NOT_MODIFIED: { status: 304, code: 304, message: "NOT_MODIFIED" },
    USE_PROXY: { status: 305, code: 305, message: "USE_PROXY" },
    TEMPORARY_REDIRECT: { status: 307, code: 307, message: "TEMPORARY_REDIRECT" },
    BAD_REQUEST: { status: 400, code: 400, message: "BAD_REQUEST" },
    UNAUTHORIZED: { status: 401, code: 401, message: "UNAUTHORIZED" },
    PAYMENT_REQUIRED: { status: 402, code: 402, message: "PAYMENT_REQUIRED" },
    FORBIDDEN: { status: 403, code: 403, message: "FORBIDDEN" },
    NOT_FOUND: { status: 404, code: 404, message: "NOT_FOUND" },
    METHOD_NOT_ALLOWED: { status: 405, code: 405, message: "METHOD_NOT_ALLOWED" },
    NOT_ACCEPTABLE: { status: 406, code: 406, message: "NOT_ACCEPTABLE" },
    PROXY_AUTHENTICATION_REQUIRED: { status: 407, code: 407, message: "PROXY_AUTHENTICATION_REQUIRED" },
    REQUEST_TIMEOUT: { status: 408, code: 408, message: "REQUEST_TIMEOUT" },
    CONFLICT: { status: 409, code: 409, message: "CONFLICT" },
    GONE: { status: 410, code: 410, message: "GONE" },
    LENGTH_REQUIRED: { status: 411, code: 411, message: "LENGTH_REQUIRED" },
    PRECONDITION_FAILED: { status: 412, code: 412, message: "PRECONDITION_FAILED" },
    REQUEST_ENTITY_TOO_LARGE: { status: 413, code: 413, message: "REQUEST_ENTITY_TOO_LARGE" },
    REQUEST_URI_TOO_LONG: { status: 414, code: 414, message: "REQUEST_URI_TOO_LONG" },
    UNSUPPORTED_MEDIA_TYPE: { status: 415, code: 415, message: "UNSUPPORTED_MEDIA_TYPE" },
    REQUESTED_RANGE_NOT_SATISFIABLE: {
        status: 416,
        code: 416,
        message: "REQUESTED_RANGE_NOT_SATISFIABLE",
        description: ""
    },
    EXPECTATION_FAILED: { status: 417, code: 417, message: "EXPECTATION_FAILED" },
    UNPROCESSABLE_ENTITY: { status: 422, code: 422, message: "UNPROCESSABLE_ENTITY" },
    TOO_MANY_REQUESTS: { status: 429, code: 429, message: "TOO_MANY_REQUESTS" },
    INTERNAL_SERVER_ERROR: { status: 500, code: 500, message: "INTERNAL_SERVER_ERROR" },
    NOT_IMPLEMENTED: { status: 501, code: 501, message: "NOT_IMPLEMENTED" },
    BAD_GATEWAY: { status: 502, code: 502, message: "BAD_GATEWAY" },
    SERVICE_UNAVAILABLE: { status: 503, code: 503, message: "SERVICE_UNAVAILABLE" },
    GATEWAY_TIMEOUT: { status: 504, code: 504, message: "GATEWAY_TIMEOUT" },

    // For spot
    UNKNOWN: { status: 400, code: 1000, message: "UNKNOWN" },
    INVALID_ORDER_TYPE: { status: 400, code: 1110, message: "INVALID_ORDER_TYPE" },
    INVALID_SIDE: { status: 400, code: 1111, message: "INVALID_SIDE" },
    BAD_SYMBOL: { status: 400, code: 1112, message: "BAD_SYMBOL" },
    NO_SUCH_ORDER: { status: 400, code: 2013, message: "NO_SUCH_ORDER" },
    TRADE_NOT_ALLOWED: { status: 400, code: 3004, message: "TRADE_NOT_ALLOWED" },
    BALANCE_NOT_ENOUGH: { status: 400, code: 6000, message: "BALANCE_NOT_ENOUGH" },

    INVALID_USER: { status: 400, code: 6000, message: 'INVALID_USER' },
    INVALID_INPUT: { status: 400, code: 6000, message: 'INVALID_INPUT' },

    NOT_FOUND_ORDER: { status: 400, code: 6101, message: 'NOT_FOUND_ORDER' },
    NOT_ENOUGH_BASE_ASSET: { status: 400, code: 6102, message: 'NOT_ENOUGH_BASE_ASSET' },
    NOT_ENOUGH_QUOTE_ASSET: { status: 400, code: 6103, message: 'NOT_ENOUGH_QUOTE_ASSET' },
    BROKER_ERROR: { status: 400, code: 6104, message: 'BROKER_ERROR' },
    INSTRUMENT_NOT_LISTED_FOR_TRADING_YET: { status: 400, code: 6105, message: 'INSTRUMENT_NOT_LISTED_FOR_TRADING_YET' },

    PRICE_FILTER: {
        status: 400,
        code: 9000,
        message: "PRICE_FILTER",
        description: "price is too high, too low, and/or not following the tick size rule for the symbol."
    },
    PERCENT_PRICE: {
        status: 400,
        code: 9001,
        message: "PERCENT_PRICE",
        description: "price is X% too high or X% too low from the average weighted price over the last Y minutes."
    },
    LOT_SIZE: {
        status: 400,
        code: 9002,
        message: "LOT_SIZE",
        description: "quantity is too high, too low, and/or not following the step size rule for the symbol."
    },
    MIN_NOTIONAL: {
        status: 400,
        code: 9003,
        message: "MIN_NOTIONAL",
        description: "price * quantity is too low to be a valid order for the symbol."
    },
    ICEBERG_PARTS: {
        status: 400,
        code: 9004,
        message: "ICEBERG_PARTS",
        description: "ICEBERG order would break into too many parts; icebergQty is too small."
    },
    MARKET_LOT_SIZE: {
        status: 400,
        code: 9005,
        message: "MARKET_LOT_SIZE",
        description: "MARKET order's quantity is too high, too low, and/or not following the step size rule for the symbol."
    },
    MAX_POSITION: {
        status: 400,
        code: 9006,
        message: "MAX_POSITION",
        description: "The account's position has reached the maximum defined limit."
    },
    MAX_NUM_ORDERS: {
        status: 400,
        code: 9007,
        message: "MAX_NUM_ORDERS",
        description: "Account has too many open orders on the symbol."
    },
    MAX_ALGO_ORDERS: {
        status: 400,
        code: 9008,
        message: "MAX_ALGO_ORDERS",
        description: "Account has too many open stop loss and/or take profit orders on the symbol."
    },
    MAX_NUM_ICEBERG_ORDERS: {
        status: 400,
        code: 9009,
        message: "MAX_NUM_ICEBERG_ORDERS",
        description: "Account has too many open iceberg orders on the symbol."
    },
    EXCHANGE_MAX_NUM_ORDERS: {
        status: 400,
        code: 9010,
        message: "EXCHANGE_MAX_NUM_ORDERS",
        description: "Account has too many open orders on the exchange."
    },
    EXCHANGE_MAX_ALGO_ORDERS: {
        status: 400,
        code: 9011,
        message: "EXCHANGE_MAX_ALGO_ORDERS",
        description: "Account has too many open stop loss and/or take profit orders on the exchange."
    }
}
