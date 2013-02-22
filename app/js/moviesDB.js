var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('moviesdb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'movies' database");
        db.collection('movies', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'movies' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving movie: ' + id);
    db.collection('movies', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
exports.findAll = function() {
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            retutn items;
        });
    });
};
var populateDB = function() {
 
    var movies = [
    {
        title: "movieTest1",
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg",
        poster_path: "/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg",
        overview: "bla bla bla bla2"
    },
    {
        title: "movieTest1",
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg",
        poster_path: "/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg",
        overview: "bla bla bla bla"
    }];
 
    db.collection('movies', function(err, collection) {
        collection.insert(movies, {safe:true}, function(err, result) {});
    });
 
};