module.exports = (app) => {
    return {
        list
    };

    // Return the list of collections in the database
    function list (req, res, next) {
        return app.horizon.adapter.getDatabaseCollections()
        .then(collections => {
            let array = [];
            collections.forEach(collection => {
                // FIXME : Hard coded private collection filter
                if (collection != "hz_collections" && collection != "hz_groups" && collection != "hz_users_auth" && collection != "users") {
                    array.push(collection);
                }
            });
            return array;
        }).then(collections => {
            res.json({
                database: app.hzConfig.project_name,
                collections: collections
            });
        }).catch(res.error);
    }
};