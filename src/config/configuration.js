var DB_USER_NAME =  'cleanGenUser';
var DB_PASSWORD = 'jime150187';
var DATABASE_URL = 'mongodb://' + DB_USER_NAME + ':' + DB_PASSWORD + '@ds057816.mlab.com:57816/cleanshop';

var configurations = function() {

    var getDataBaseUrl = function() {
        return DATABASE_URL;
    };

    return {
        DataBaseUrl: getDataBaseUrl,
    };
};

module.exports = configurations;