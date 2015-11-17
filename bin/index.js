var nodeDrpc = require('storm-drpc-node');
var config = require('config');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/configuration', function (req, res){
    var options = {
        host: config.get('drpc_server.host'),
        port: config.get('drpc_server.port')
    };
    //Note : timeout is optional
    var nodeDrpcClient = nodeDrpc(options);

    nodeDrpcClient.execute("BDS_RPC", JSON.stringify(req.body), function(err, response) {

        if (err) {
            console.error(err);
            // implement error handling logic here
        } else {
            console.log("Storm function response :", response);
            res.status(200).send(response);
        }
    });
});

app.listen(3000);