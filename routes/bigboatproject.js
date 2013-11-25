var nconf = require('nconf')
    , repositoryOrgs    = require('../repository/organisations');

/* Pages */
exports.index = function (req, res) {
  var data = {
    page : "index",
    user : { "name": "John Smith", "email": "john@test.com" },
    organisations : [
      { "id": "1", "name" : "ACME" },
      { "id": "2", "name" : "Contoso" }
    ]
  }
    res.render('bigboatproject/index', data);
};

/* API */

exports.messages = function(req, res){
  res.send([
    {"name": "Greg", "text":"Hello", "created": "2013 Oct 8 2:00 pm" }, 
    {"name": "Anonymous", "text": "Sample Data", "created": "2013 Oct 7 9:31 am" } 
  ]);
};
