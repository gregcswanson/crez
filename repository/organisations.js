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

tableService.createTableIfNotExists('organisations', function (error) {
    if (error) {
        // Table not exists or created
        console.log(error);
    } else {
        console.log('Azure table organisations ready');
    }
});

exports.FindByID = function (id, callback) {
    tableService.queryEntity('organisations', 'all', id, function (error, foundItem) {
        if (error) {
            callback(error, null);
        } else {
            var item = {
                id: id
                , name: foundItem.name
                , created: foundItem.created
            };
            callback(null, item);
        }
    });
};

exports.All = function(callback) {
  var query = azure.TableQuery
        .select()
        .from('organisations')
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
    var newItem = {
        PartitionKey: 'all'
        , RowKey: uuid()
        , name: item.name
        , created: new Date()
    };
  console.log(message);
    tableService.insertEntity('organisations', newItem, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Table storage organisations added: ' + newItem.RowKey);
            item.created = newItem.created;
        }
        if (error) return callback(error, null);
        callback(null, item);
    });
};

exports.Update = function (item, callback) {
    var updateItem = {
        PartitionKey: 'all'
        , RowKey: item.id
        , name: item.name
        , created: new Date()
    };
    tableService.mergeEntity('organisations', updateItem, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Table storage organisations updated: ' + updateItem.RowKey);
        }
        if (error) return callback(error, null);
        callback(null, updateItem);
    });
};

exports.Delete = function(item, callback){
  tableService.deleteEntity('organisations'
    , {
        PartitionKey : 'all'
        , RowKey : item.id
    }
    , function(error){
        if (error) return callback(error, null);
        callback(null, item);
    });
};
