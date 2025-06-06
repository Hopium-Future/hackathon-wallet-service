const Env = use('Env')


module.exports = (Route) => {
    Route.group(() => {
        Route.get('test_balance', async () => {
            const WalletService = use('App/Services/WalletService')
            const result = await WalletService.changeBalance(
                94376966,
                617,
                100e6,
                0,
                4,
                'Test',
            )
            return result
        })
        Route.get('batch_changebalance', async () => {
            const WalletService = use('App/Services/WalletService')
            const Promise = require('bluebird')

            const jobs = [], success = [], failed = []
            const LENGTH = 50000
            console.log('>>>>>>>>> LENGTH', LENGTH)
            const numArr = []
            for (let i = 1; i <= LENGTH; ++i) {
                numArr.push(i);
            }
            console.log('<<<<<<<< created jobs')
            let progCount = 0, lastProgress;
            function reportProgress() {
                const perc = (++progCount - 1) / LENGTH * 100;
                if (lastProgress == null || perc - lastProgress > 5) {
                    console.log(`======= ${perc} % =======`)
                    lastProgress = perc;
                }
            }
            const START = Date.now();
            await Promise.each(numArr, async (val, i) => {
                await WalletService.changeBalance(
                    96883884,
                    617,
                    val,
                    0,
                    'DEPOSIT',
                    'Test',
                ).then(() => {
                    success.push(i);
                })
                    .catch(() => {
                        failed.push(i);
                    })

                reportProgress();
            })
            console.log(`Report: ok length=${success.length}, failed length=${failed.length}; time=${Date.now() - START}`)
        })
    }).prefix('test')
}
