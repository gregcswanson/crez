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

tableService.createTableIfNotExists('messages', function (error) {
    if (error) {
        // Table exists or created
        console.log(error);
    } else {
        console.log('Azure table messages ready');
    }
});

exports.FindOrCreate = function (item, callback) {
    var self = this;
    this.FindByID(item.id, function (error, message) {
        if (error) {
            self.Add(item, function (error, message) {
                callback(error, message);
            });
        } else {
            callback(null, message)
        }
    });
};

exports.FindByID = function (id, callback) {
    tableService.queryEntity('messages', 'all', id, function (error, message) {
        if (error) {
            callback(error, null);
        } else {
            var item = {
                id: id
                , name: message.name
                , text: message.text
                , created: message.created
            };
            callback(null, item);
        }
    });
};

exports.Add = function (item, callback) {
    var message = {
        PartitionKey: 'all'
        , RowKey: item.id
        , name: item.name
        , text: item.text
        , created: new Date()
    };
    tableService.insertEntity('messages', message, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Table storage message added: ' + message.RowKey);
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
    tableService.mergeEntity('messages', message, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Table storage message updated: ' + message.RowKey);
        }
        if (error) return callback(error, null);
        callback(null, message);
    });
};
