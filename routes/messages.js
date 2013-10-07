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

exports.messages = function(req, res){
  res.send([
    {"name": "Greg", "text":"Hello", "created": "2013 Oct 8 2:00 pm" }, 
    {"name": "Anonymous", "text": "Sample Data", "created": "2013 Oct 7 9:31 am" } 
  ]);
};