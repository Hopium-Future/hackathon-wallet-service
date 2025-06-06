exports.subscribeChange = function() {
    ;[
        use('App/Models/Config/AssetConfig'),
    ].forEach(model => {
        model.watch().on('change', async data => {
            await model.clearMemoryCache()
        })
    })
}
