var nconf = require('nconf')
    , azure = require('azure');
    //, repositoryMessages    = require('../repository/messages');

var axureStorageAccount = nconf.get('AZURE_STORAGE_ACCOUNT') || '';
var azureStorageKey = nconf.get('AZURE_STORAGE_ACCESS_KEY') || '';
var blobService = azure.createBlobService(axureStorageAccount, azureStorageKey);

blobService.createContainerIfNotExists("sample-blobs"
    , {publicAccessLevel : 'blob'}
    , function(error){
        if(!error){
            // Container exists and is public
            console.log('Azure sample-blobs container is ready');
        }
    });

/* Pages */
exports.index = function (req, res) {
    var username = '';
    
    var data = [];
    
    blobService.listBlobs("sample-blobs", function(error, blobs){
        if(!error){
            data = blobs;
            for(var index in blobs){
                console.log(blobs[index]);
            }
            res.render('blobs/index', { page:'blobs', user: username, data: data });
        }
    });
    
};

exports.blobPost = function(req, res ) {
    // req.files.fileName.type image/png
    // save the file
    
    var options = {
			contentType: req.files.fileName.type,
			metadata: { fileName: req.files.fileName.name }
		};
    
    blobService.createBlockBlobFromFile(
        "sample-blobs"
        , req.files.fileName.name
        , req.files.fileName.path
        , options
        , function(error){
            if(!error){
                // File has been uploaded
                console.log(req.files.fileName.name + ' uploaded!');
                res.redirect("/blobs");
            }
    });
    
    
};