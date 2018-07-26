'use strict';

const restify = require('restify');
// const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');


/*
/ Menentukan Nama Server Dan Versi Server
*/
const server = restify.createServer({
    name: 'X Kitchen Project',
    version: '1.0.0'
});

server.use(bodyParser.json());

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
    next();
});

server.get('/', (req, res, next) => {
    var html = '<html><head><title>Some Title</title></head><body><h1>LiveCode</h1></body></html>';

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(html),
        'Content-Type': 'text/html'
    })

    res.write(html);
    res.end;
});

/*
/ Route
/ Components Route
*/


require('./components/template.controller')(server, 'test');
require('./components/template.controller')(server, 'users');
require('./components/template.controller')(server, 'categories');
require('./components/template.controller')(server, 'products');



/*
/ global itu framework dari nodeJS
/ .config it's what ever you want
*/
global.config = require('./components/configurations/config');

//Use connect method to connect to the server
// MongoClient.connect(config.dbconn, function(error, client) {   
//     if(error){
//         console.log('Unable to connect to Database');
//     }else{
//         console.log('Successfully to connect to Database');
//     }
//   });

/*
 * Let's to try with JWT
 * 
 */

// server.get('/api', (req, res, next) => {
//     res.json({
//        message: 'Welcome'
//     });
// });

// server.post('/api/posts', verifyToken, (req, res, next) => {

//    jwt.verify(req.token, 'secretkey', (err, authData) => {
//        if(err){
//            return next(new Error(err));
//        }else{
//            res.json({
//                message: 'Post Created',
//                authData
//             });
//        }
//    });
   
// });

// server.get('/api/posts', verifyToken, (req, res, next) => {

//    jwt.verify(req.token, 'secretkey', (err, authData) => {
//        if(err){
//            return next(new Error(err));
//        }else{
//            res.json({
//                message: 'Post Created',
//                authData
//             });
//        }
//    });
   
// });

// server.post('/api/login', (req, res, next) => {
//    const user = {
//        id: 1,
//        username: 'tisufa',
//        email: 'titus@sentuh.net'
//    }
//    jwt.sign({user}, 'secretkey', (err, token) => {
//        res.json({
//            token
//        });
//    });
// });

// /**
// * Format Of Token
// * Authorization: Bearer <access_token>
// * Verify Tokens
// */
// function verifyToken(req, res, next){
//    /**
//     * Get auth header value
//     */
//    const bearerHeader = req.headers['authorization'];
//    // Check if bearer is undefined
//    if(typeof bearerHeader !== 'undefined'){
//        // Split at the space
//        const bearer = bearerHeader.split(' ');
//        // Get token from array
//        const bearerToken = bearer[1];
//        // set the token
//        req.token = bearerToken;
//        // Next middleware
//        next();
//    }else{
//        // FOrbidden
//        res.json({
//            message: 'forbidden'
//        });
//    }
// }

server.listen(config.port, function () {
    console.log('%s listen at %s', server.name, server.url);
});