var mongo = require('mongodb'),
     util = require('util');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017,{auto_reconnect: true});
db = new Db('moviesdb', server, {w: 1});
 
db.open(function(err, db) {
    if(!err) {
        util.puts("Connected to 'movies' database");
        db.collection('movies', {safe:true}, function(err, collection) {
            if (err) {
                util.puts("The 'movies' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
    else{
        util.puts(err);
    }
}); 

exports.findById = function(req, res, collection, id) {
    console.log('Retrieving movie: ' + id);
    db.collection(collection, function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            if(!err && item!=null){
                res.write(JSON.stringify(item));
                res.end();
            }
            else {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write('<!doctype html>\n');
                res.write('<title>404 Not Found</title>\n');
                res.write('<h1>Not Found</h1>');
                res.write(
                   '<p>The requested item ' + collection +'/'+id +
                   ' was not found on this server.</p>'
                );
                res.end();
            }
        });
    });
};
exports.findAll = function(req,res,collection) {
    db.collection(collection, function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.write(JSON.stringify(items));
            res.end();
        });
    });
};
var populateDB = function() {
    util.puts("populando base de datos");
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