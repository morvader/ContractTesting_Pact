const Film = require('../models/filmModel');
const FilmRepository = require('../models/filmsRepository');

const filmRepository = new FilmRepository();

exports.list_all_films = function(req, res) {
    const response = {
        films: filmRepository.fetchAll()
    };
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
  };

exports.create_a_film = function(req, res){

    var new_film = Film.fromJson(req.body);

    var filmExist = filmRepository.getById(new_film.id);

    if(filmExist != undefined){
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify("Duplicate ID"));
    }

    filmRepository.insert(new_film);

    res.end(JSON.stringify(new_film));
};

exports.delete_a_film = (req, res) => {
    var id = req.params.filmId;
    const response = {
        cod: filmRepository.delete(id)
    }
    if(response.cod === -1){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify("ID Not found"));
    }
    res.end(JSON.stringify("Film Deleted"));
};

exports.list_init_data = function(req, res){
    filmRepository.clear();

    filmRepository.insert(new Film(1,"Star Wars", "Space", 1980));
    filmRepository.insert(new Film(2,"Superman", "Comic", 1986));
    filmRepository.insert(new Film(3,"Indiana Jones", "Adventures", 1985));

    res.end();
};

exports.read_a_film = function(req, res){
    var id = req.params.filmId;

    const response = {
        film: filmRepository.getById(id)
    };

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
};