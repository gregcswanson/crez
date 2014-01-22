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
  };
    res.render('bigboatproject/index', data);
};

exports.pivot = function(req, res) {
  var data = {
    page : "index",
    user : { "name": "John Smith", "email": "john@test.com" },
    items: [
      { "id": "1", "name" : "ACME", "category": "SALES", "year": 2010 },
      { "id": "2", "name" : "Contoso", "category": "DEVELOPMENT", "year": 2011 },
      { "id": "3", "name" : "Toronto", "category": "MARKETING", "year": 2012 },
      { "id": "4", "name" : "Miller", "category": "SALES", "year": 2011 },
      { "id": "5", "name" : "Palmer", "category": "SALES", "year": 2010 },
      { "id": "6", "name" : "Pacific", "category": "DEVELOPMENT", "year": 2010 },
      { "id": "7", "name" : "Fiji", "category": "DEVELOPMENT", "year": 2011 },
      { "id": "8", "name" : "Corona", "category": "DEVELOPMENT", "year": 2010 },
      { "id": "9", "name" : "Toms", "category": "SALES", "year": 2010 },
      { "id": "10", "name" : "Pixel", "category": "SALES", "year": 2011 },
      { "id": "11", "name" : "Lego", "category": "SALES", "year": 2012 },
      { "id": "12", "name" : "Fabrikam", "category": "SALES", "year": 2011 },
      { "id": "13", "name" : "Spain", "category": "MARKETING", "year": 2011 }
      
    ] 
  };
 
  res.render('bigboatproject/pivot', data);
};

/* API */

exports.pivotData = function(req, res){
  
  var data = [
      { "id": "1", "name" : "ACME", "category": "SALES", "year": 2010 },
      { "id": "2", "name" : "Contoso", "category": "DEVELOPMENT", "year": 2011 },
      { "id": "3", "name" : "Toronto", "category": "MARKETING", "year": 2012 },
      { "id": "4", "name" : "Miller", "category": "SALES", "year": 2011 },
      { "id": "5", "name" : "Palmer", "category": "SALES", "year": 2010 },
      { "id": "6", "name" : "Pacific", "category": "DEVELOPMENT", "year": 2010 },
      { "id": "7", "name" : "Fiji", "category": "DEVELOPMENT", "year": 2011 },
      { "id": "8", "name" : "Corona", "category": "DEVELOPMENT", "year": 2010 },
      { "id": "9", "name" : "Toms", "category": "SALES", "year": 2010 },
      { "id": "10", "name" : "Pixel", "category": "SALES", "year": 2011 },
      { "id": "11", "name" : "Lego", "category": "SALES", "year": 2012 },
      { "id": "12", "name" : "Fabrikam", "category": "SALES", "year": 2011 },
      { "id": "13", "name" : "Spain", "category": "MARKETING", "year": 2011 } 
    ];
  
  res.send(data);
};
