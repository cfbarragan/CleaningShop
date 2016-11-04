var configurations = function(dburi) {

    var getDataBaseUrl = function(dburi) {
        return dburi;
    };

    return {
        DataBaseUrl: dburi,
    };
};

module.exports = configurations;