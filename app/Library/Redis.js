const RedisWallet = use('Redis').connection('wallet')
exports.initRedisCommand = async function () {
	await RedisWallet.defineCommand('wallet_transfer', {
		numberOfKeys: 0,
		lua: 'local wallet_key, amount, allow_negative, wallet_hash\n' +
			'\n' +
			'    wallet_hash = ARGV[1]\n' +
			'    wallet_key = ARGV[2]\n' +
			'    amount = tonumber(ARGV[3])\n' +
			'    allow_negative = tonumber(ARGV[4])\n' +
			'    local wallet_before, wallet_after, error_code\n' +
			'    wallet_after = 0\n' +
			'    error_code = 0\n' +
			'    wallet_before = tonumber(redis.call("hget", wallet_hash, wallet_key))\n' +
			'    wallet_after = wallet_before\n' +
			'    if (wallet_before == nil) then error_code = 1\n' +
			'    end\n' +
			'    if (allow_negative ~= 1 and (amount < 0 and wallet_before < -0.00001)) then\n' +
			'        error_code = 2\n' +
			'    end\n' +
			'    if (allow_negative ~= 1 and (amount < 0 and wallet_before < -(amount+0.00001))) then\n' +
			'        error_code = 3\n' +
			'    end\n' +
			'    if (error_code == 0) then\n' +
			'        wallet_after = wallet_before + amount\n' +
			'        redis.call("hset", wallet_hash, wallet_key, wallet_after)\n' +
			'    end\n' +
			'    return { tostring(wallet_before), tostring(wallet_after), tostring(amount), error_code }'
	});
}

function buildArgvs(num) {
	let argvs = ''
	if (num < 1) return argvs
	for (let i = 1; i <= num; i++) {
		argvs += (i === 1 ? '' : ',') + `ARGV[${i}]`
	}
	return argvs
}
