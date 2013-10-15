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
  repositoryMessages.All(function(err, items){
      res.send(items);
  });
  /*res.send([
    {"name": "Greg", "text":"Hello", "created": "2013 Oct 8 2:00 pm" }, 
    {"name": "Anonymous", "text": "Sample Data", "created": "2013 Oct 7 9:31 am" } 
  ]);*/
};

exports.messagesPost = function (req, res) {
    var name = req.user.email;
    repositoryMessages.Add({'text': req.body.text, 'name': name, 'created': new Date()}, function(err, item){
        res.send(item);
    });
};

exports.messagesDelete = function(req, res) {
  repositoryMessages.FindByID(req.body.id, function(err, message){
    if (err){
      res.send(err);
    } else {
      repositoryMessages.Delete(message, function(err, item){
        res.send(item);
      });
    }
  });
};