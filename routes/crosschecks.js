var nconf = require('nconf');
    //, repositoryCrossChecks    = require('../repository/crosschecks');

/* Pages */
exports.index = function (req, res) {
    var username = 'Fake User';
	//var userID = 'fu';
    //if(req.user !== null)
    //{
    //    username = req.user;
    //}
    res.render('crosschecks/index', { page:'messages', user: username });
};
