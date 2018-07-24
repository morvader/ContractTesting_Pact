'use strict';
module.exports = function (app) {
    var filmList = require('../controllers/filmsController');

    // filmList Routes
    app.route('/films')
        .get(filmList.list_all_films)
        .post(filmList.create_a_film);

    app.route('/init')
        .post(filmList.list_init_data);

    app.route('/films/:filmId')
        .get(filmList.read_a_film)
        .delete(filmList.delete_a_film);
    //   .put(filmList.update_a_film)
    //   .delete(filmList.delete_a_film);*/
};