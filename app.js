
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path');

var app = express();

var mongoose = require('mongoose');

var readability = require("node-readability");

var config = require('./config');

var user = require('./models/user');

var passport = require('passport'),
	facebookStrategy = require('passport-facebook').Strategy;


//setting for passport
passport.serializeUser(function(user,done)
{
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	user.findOne({_id : id}, function(err, user){
		done(err,user);
	});
});

mongoose.connect(config.dev.dbUrl);

passport.use(new facebookStrategy({
	clientID: config.dev.fb.appId,
	clientSecret: config.dev.fb.appSecret,
	callbackURL: config.dev.fb.url + 'fbauthed',
}, function(accessToken, refreshToken, profile, done)
	{
		process.nextTick(function(){
			var query = user.findOne({'fbId': profile.id});
			query.exec(function(err, oldUser){
				
				if(oldUser)
				{
					console.log("found old user: " + oldUser.name + ": Logged in!");
					done(null, oldUser);
				}
				else{
					var newUser = new user();
					newUser.fbId = profile.id;
					newUser.name = profile.displayName;
					newUser.email = profile.emails[0].value;
					console.log(newUser);
					newUser.save(function(err){
						if(err){
							throw err;
						}
						console.log("New user " + newUser.name + " was created");
						done(null, newUser);
					});
				}
			});
			
		});
	}
));

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret:'kjhsa312398sadck23h08'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//ROUTING
app.get('/', routes.index);
app.get('/home', routes.home);


//LOGIN
app.get('/fbauth', passport.authenticate('facebook', {scope:'email'}));
app.get('/fbauthed', passport.authenticate('facebook',{ 
  failureRedirect: '/',
  successRedirect: '/home'
}));
app.get('/logout', function(req, res){
	req.logOut();
	res.redirect('/');
});
app.get('/error', function(req,res){
	res.send(401,'{err: bad login}');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Farticle server listening on port ' + app.get('port'));
});


//API
app.post('/api/article/', ensureAuthenticated , api.postArticle);
app.get('/api/article/', ensureAuthenticated , api.getArticle);

// var readability = require('node-readability');

// readability.read('http://howtonode.org/really-simple-file-uploads', function(err, article) {
//   console.log(article.getContent());
// });


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/error');
}

