var mongo = require('mongodb'),
     util = require('util');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var db = '';
exports.openDB = function (callback){
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
}
/*
 * Basic common DB operations
 */
exports.findById = function(req, res, table, id) {
    console.log('Retrieving movie: ' + id);
    db.collection(table, function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            if(!err && item!=null){
                res.write(JSON.stringify(item));
                res.end();
            }
            else {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end();
            }
        });
    });
};

exports.findAll = function(res,table, script) {
    db.collection(table, function(err, collection) {
        collection.find().toArray(function(err, items) {
            if(script){
                return items;
            }
            else{
                res.write(JSON.stringify(items));
                res.end();
            }
        });
    });
};

exports.insert = function(data, res, table) {
    var item = JSON.parse(data);
    util.puts('Adding item: ' + item);
    db.collection(table, function(err, collection) {
        collection.insert(item, {safe:true}, function(err, result) {
            if (err) {
                res.write('error : An error has occurred');
                res.end();
            } else {
                util.puts('Success: ' + result[0]);
                res.end();
            }
        });
    });
}

exports.update = function(data, res, table) {
    var item = JSON.parse(data);

    item._id = new BSON.ObjectID(item._id);
    util.puts('Updating item: ' + item._id);
    db.collection(table, function(err, collection) {
        collection.update({'_id':item._id}, item, {safe:true}, function(err, result) {
            if (err) {
                util.puts('Error updating item: ' + err);
                res.write('error : An error has occurred');
                res.end();
            } else {
                util.puts('' + result + ' document(s) updated');
                res.writeHead(200);
                res.end();
            }
        });
    });
}

exports.delete = function(req, res, table, id) {
    console.log('Deleting '+table+': ' + id);
    db.collection(table, function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.write('error : An error has occurred - ' + err);
                res.end();
            } else {
                console.log('' + result + ' document(s) deleted');
                res.end();
            }
        });
    });
}

exports.insertOrUpdateGenre = function(data, res, table) {
    var genres = JSON.parse(data).genres;
    for (item in genres){
        db.collection(table, function(err, collection) {
            collection.update({'id':genres[item].id}, genres[item], {safe:true, upsert: true}, function(err, result) {
                if (err) {
                    util.puts('Error updating item: ' + err);
                } else {
                    util.puts('' + result + ' document(s) updated');
                }
            });
        });
    }
}
/*
 * other future DB operations
 */
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