var mongo = require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {
    auto_reconnect: true
});
db = new Db('blogdb', server);

/* function to open a connection to database */
db.open(function(err, db) {
    if (!err) {
        console.log("Connected to 'blogdb' database");
        db.collection('blog', {
            strict: true
        }, function(err, collection) {
            if (err) {
                console.log("The 'blog' collection doesn't exist. Creating it with sample data...");
                //  populateDB();
            }
        });
    }
});

/* function to find all the blog entries */
exports.findAll = function(req, res) {
    db.collection('blog', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

/* function to add the blog entry to db */
exports.addBlog = function(req, res) {
    var blog = req.body;
    console.log('Adding blog: ' + JSON.stringify(blog));
    db.collection('blog', function(err, collection) {
        collection.insert(blog, {
            safe: true
        }, function(err, result) {
            if (err) {
                res.send({
                    'message': 'failed to Insert.Please try again',
                    "isInserted": false
                });
            } else {
                res.send({
                    'message': 'Blog Added Successfully',
                    "isInserted": true
                });
            }
        });
    });
};
