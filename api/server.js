var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  Film = require("./models/filmModel"),
  bodyParser = require("body-parser");

const controller = require("./controllers/filmsController");

const init = () => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var routes = require("./routes/filmsRoutes"); //importing route
  routes(app); //register the route
  controller.init_data();
  return app.listen(port, () =>
    console.log(`Provider API listening on port ${port}...`)
  );
};

init();
