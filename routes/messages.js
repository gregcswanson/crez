var nconf = require('nconf')
    , repositoryMessages    = require('../repository/messages');

/* Pages */
exports.index = function (req, res) {
    var username = '';
    //if(req.user !== null)
    //{
    //    username = req.user;
    //}
    res.render('messages/index', { page:'messages', user: username });
};

/* API */