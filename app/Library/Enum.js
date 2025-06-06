const ms = require('ms')

exports.Wallet = {
	ErrorCode: {
		1: 'NOT_FOUND_WALLET_KEY',
		2: 'NEGATIVE_WALLET_VALUE',
		3: 'MONEY_IS_NOT_ENOUGH'
	},

	MoneyType: {
		MAIN_BALANCE: 'MAIN',
		LOCK_BALANCE: 'LOCK'
	},
	WalletType: {
		MAIN: 'MAIN',
		FUTURES: 'FUTURES',
		BROKER: 'BROKER',
	},

	Result: {
		INVALID_USER: 'INVALID_USER',
		INVALID_USER_ROLE: 'INVALID_USER_ROLE',
		INVALID_INPUT: 'INVALID_INPUT',
		NOT_ENOUGH_NAC: 'NOT_ENOUGH_NAC',
		NOT_ENOUGH_ETH: 'NOT_ENOUGH_ETH',
		NOT_ENOUGH_CURRENCY: 'NOT_ENOUGH_CURRENCY',
		UNKNOWN_ERROR: 'UNKNOWN_ERROR',
		INVALID_TIME_BACK_ETH: 'INVALID_TIME_BACK_ETH'
	},
	KeyChangeBalanceRedis: 'redis:wallet:change:balance',
	TransactionStatus: {
		FAILED: 0, // Khi bị rollback thì cập nhật status = failed
		SUCCESS: 1,
		ROLLBACK: 2,
	}
}
