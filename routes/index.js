var nconf = require('nconf')
    , repositoryProfile    = require('../repository/profile');

exports.index = function (req, res) {
    res.render('index', { page:'dashboard', user: req.user });
};

exports.about = function (req, res) {
    res.render('about', { page:'about', user: req.user });
};

exports.user = function (req, res) {
    res.render('user', { page:'user', user: req.user });
};

exports.userPost = function (req, res) {
    repositoryProfile.FindByID(req.user.email, function (err, user) {
        user.bio = req.body.bio;
        repositoryProfile.Update(user, function (err, user) {
            // message updated
            res.redirect('/user');
        });
    });
};

exports.app = function (req, res) {
    res.render('app', { title: 'Website Rant', user: req.user });
};

exports.styleguide = function (req, res) {
    res.render('styleguide', { page: 'styleguide' });
};

exports.login = function (req, res) {
    res.render('login', { page: 'login' });
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
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
            key: nconf.get('AZURE_STORAGE_ACCESS_KEY') || ''
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
    nconf.save(function () {
        res.redirect('/configuration');
    });
};