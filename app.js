/*jshint node:true*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

var SP = require('sparkpost');
var spClient = new SP('REPLACE_THIS_WITH_YOUR_SPARKPOST_API_KEY');

// This application uses express as it's web server
// for more info, see: http://expressjs.com
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// serve the files out of ./public as our main files
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.post('/sparkpost', function( req, res ) {
	/* UNCOMMENT TO VIEW IN NODE LOGS
	console.log( 'SHOULD BE SENDING EMAIL NOW' );
	console.log( 'RCPT EMAIL: ', req.body.rcptEmail );
	*/
	var reqOpts = {
		transmissionBody: {
			options: {
				open_tracking: true,
				click_tracking: true
			},
			recipients: [
				{
					address: {
						email: req.body.rcptEmail
					},
				}
			],
			content: {
				from: {
					name: "REPLACE THIS WITH YOUR FROM NAME",
					email: "sparkybluemix@REPLACE_WITH_YOUR_SENDING_DOMAIN.TLD"
				},
				subject: "You are welcomed!",
				reply_to: "SparkPost IBM Bluemix Welcome <sparkybluemix@REPLACE_WITH_YOUR_SENDING_DOMAIN.TLD>",
				text: "Welcome!",
				html: "<h1>Welcome!</h1>"
			}
		}
	};

	spClient.transmissions.send(reqOpts, function(err, txData) {
		if (err) {
			console.log(err);
			console.log('DATA: ', txData );
		} else {
			console.log("Congrats you can use our SDK!");
			console.log('DATA: ', txData );
			res.status(200).send(txData);
		}
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, appEnv.bind, function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
