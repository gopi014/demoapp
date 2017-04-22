var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var blogs = require('./routes/blogs');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

/* api to get all the blog entries */
app.get('/blog', blogs.findAll);

/*api to post blog entry to db */
app.post('/blog', blogs.addBlog);

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../client/app')));

app.set('port', process.env.PORT || 9999);
http.createServer(app).listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
});


module.exports = app;
