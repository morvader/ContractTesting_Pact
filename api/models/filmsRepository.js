class FilmRepository {

    constructor() {
        this.films = [];
    }

    fetchAll() {
        return this.films;
    }

    getById(filmId) {
        return this.films.find((film) => filmId == film.id);
    }

    insert(film) {
        this.films.push(film);
    }

    delete(filmId) {
        var elem = this.getById(filmId);
        if (typeof elem === "undefined") {
            return -1;
        }
        var index = this.films.indexOf(elem);
        this.films.splice(index, 1);

    }
    update(filmId,film) {
        var elem = this.getById(filmId);
        if (typeof elem === "undefined") {
            return -1;
        }
        var index = this.films.indexOf(elem);
        this.films[index] = film;

    }

    clear() {
        this.films = [];
    }
}

module.exports = FilmRepository;