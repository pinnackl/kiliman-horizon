module.exports = (app) => {
    return {
        list
    };

    // Return the list of collections in the database
    function list (req, res, next) {
        return app.horizon.adapter.getDatabaseCollections()
        .then(collections => {
            res.json({
                database: app.hzConfig.project_name,
                collections: collections
            });
        })
        .catch(res.error);
    }
};