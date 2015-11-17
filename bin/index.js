var nodeDrpc = require('storm-drpc-node');
var koa = require('koa');
var config = require('config');
var router = require('koa-router')();
var koaBody = require('koa-body');
var cors = require('koa-cors');

var app = koa();

app.use(cors());

app.use(koaBody({formidable:{uploadDir: __dirname}}));

router.post('/configuration', function *(next){
    var options = {
        host: config.get('drpc_server.host'),
        port: config.get('drpc_server.port')
    };
    //Note : timeout is optional
    var nodeDrpcClient = nodeDrpc(options);

    //const DRPC_NAME = "BDS_RPC";

    nodeDrpcClient.execute("BDS_RPC", JSON.stringify(this.request.body), function(err, response) {

        console.log(err, response)
        if (err) {
            console.error(err);
            // implement error handling logic here
        } else {
            console.log("Storm function response :", response);
            // implement your logic here
        }
        return next();
    });
});

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);