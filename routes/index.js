var nconf = require('nconf');

exports.index = function (req, res) {
    res.render('index', { title: 'Website Rant' });
};

exports.user = function (req, res) {
    res.render('user', { title: 'Website Rant' });
};

exports.app = function (req, res) {
    res.render('app', { title: 'Website Rant' });
};

exports.styleguide = function (req, res) {
    res.render('styleguide', { title: 'Style Guide' });
};

exports.login = function (req, res) {
    res.render('login', { title: 'Website Rant' });
};

exports.configuration = function (req, res) {
    if (!req.session.configurationConfirmed || !req.session.configurationConfirmed) {
        res.render('configurationLogin', { title: 'Configuration' });
    } else {
        var temp = req.session.temp;
        if (!temp) temp = "";
        res.render('configuration',
        {
            title: 'Configuration',
            secret: nconf.get('http:secret'),
            password: '',
            callbackurl: nconf.get('callbackurl'),
            name: nconf.get('AZURE_STORAGE_ACCOUNT') || '',
            key: nconf.get('AZURE_STORAGE_ACCESS_KEY') || '',
            mongodbserver: nconf.get('MONGO_DB_SERVER') || '',
            mongodbport: nconf.get('MONGO_DB_PORT') || '',
            mongodbdatabase: nconf.get('MONGO_DB_DATABASE') || '',
            mongodbusername: nconf.get('MONGO_DB_USERNAME') || '',
            mongodbpassword: nconf.get('MONGO_DB_PASSWORD') || ''
        });
    }
};

exports.configurationLogin = function (req, res) {
    if (nconf.get('password') == req.body.password) {
        req.session.configurationConfirmed = true;
    }
    res.redirect('/configuration');
};

exports.congifurationLogout = function (req, res) {
    req.session.configurationConfirmed = false;
    res.redirect('/');
};

exports.configurationPost = function (req, res) {
    if (req.body.password && req.body.password.length !== 0) {
        nconf.set('password', req.body.password);
    }
    nconf.set('callbackurl', req.body.callbackurl);
    nconf.set('http:secret', req.body.secret);
    nconf.set('AZURE_STORAGE_ACCOUNT', req.body.storagename);
    nconf.set('AZURE_STORAGE_ACCESS_KEY', req.body.storagekey);
    nconf.set('MONGO_DB_SERVER', req.body.mongodbserver);
    nconf.set('MONGO_DB_PORT', req.body.mongodbport);
    nconf.set('MONGO_DB_DATABASE', req.body.mongodbdatabase);
    nconf.set('MONGO_DB_USERNAME', req.body.mongodbusername);
    nconf.set('MONGO_DB_PASSWORD', req.body.mongodbpassword);
    nconf.save(function () {
        res.redirect('/configuration');
    });
};