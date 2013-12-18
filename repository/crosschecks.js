/* 
Use Azure Table Storage as the repository for all data
This module is only concerned with CRUD operations and not with any validations
*/

var azure = require('azure')
    , uuid = require('node-uuid')
    , nconf = require('nconf');

var axureStorageAccount = nconf.get('AZURE_STORAGE_ACCOUNT') || '';
var azureStorageKey = nconf.get('AZURE_STORAGE_ACCESS_KEY') || '';
var tableService = azure.createTableService(axureStorageAccount, azureStorageKey);

/*
https://www.windowsazure.com/en-us/develop/nodejs/how-to-guides/table-services
https://github.com/WindowsAzure/azure-sdk-for-node
*/

tableService.createTableIfNotExists('crosschecks', function (error) {
    if (error) {
        // Tablea exists or created
        console.log(error);
    } else {
        console.log('Azure table crosschecks ready');
    }
});

exports.FindOrCreate = function (item, callback) {
    var self = this;
    this.FindByID(item.id, function (error, foundItem) {
        if (error) {
            self.Add(item, function (error, foundItem) {
                callback(error, foundItem);
            });
        } else {
            callback(null, foundItem);
        }
    });
};

exports.FindForUserByID = function (id, callback) {
    tableService.queryEntity('crosschecks', 'all', id, function (error, message) {
        if (error) {
            callback(error, null);
        } else {
            var item = {
                id: id
                , name: message.name
                , text: message.text
                ,
                , created: message.created
            };
            callback(null, item);
        }
    });
};

exports.All = function(callback) {
  var query = azure.TableQuery
        .select()
        .from('crosschecks')
        .where('PartitionKey eq ?', 'all');
    tableService.queryEntities(query, function (error, entities) {
        if (error) {
            callback(error, null);
        } else {
            console.log(entities);
            callback(null, entities);
        }
    });
};

exports.Add = function (item, callback) {
  console.log('Add');
    var message = {
        PartitionKey: 'all'
        , RowKey: uuid()
        , name: item.name
        , text: item.text
        , created: new Date()
    };
  console.log(message);
    tableService.insertEntity('crosschecks', message, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Table storage crosschecks added: ' + message.RowKey);
            item.created = message.created;
        }
        if (error) return callback(error, null);
        callback(null, item);
    });
};

exports.Update = function (item, callback) {
    var message = {
        PartitionKey: 'all'
        , RowKey: item.id
        , name: item.name
        , text: item.text
        , created: new Date()
    };
    tableService.mergeEntity('crosschecks', message, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Table storage crosschecks updated: ' + message.RowKey);
        }
        if (error) return callback(error, null);
        callback(null, message);
    });
};

exports.Delete = function(item, callback){
  tableService.deleteEntity('crosschecks'
    , {
        PartitionKey : 'all'
        , RowKey : item.id
    }
    , function(error){
        if (error) return callback(error, null);
        callback(null, item);
    });
};
