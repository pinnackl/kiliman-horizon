module.exports = (app) => {
    return {
        list,
        documents,
        document
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

    function documents (req, res, next) {
        return app.horizon.adapter.getDocuments(req.params.collection)
        .then(collections => {
            res.json(collections);
        }).catch(res.error);
    }

    function document (req, res, next) {
        return app.horizon.adapter.getDocument(req.params.collection, req.params.id)
        .then(document => {
            res.json(document);
        }).catch(res.error);
    }
};