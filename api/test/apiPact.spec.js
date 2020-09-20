const { Verifier } = require("@pact-foundation/pact");
const { Matchers } = require("@pact-foundation/pact");
const controller = require("../controllers/filmsController");

var path = require("path");
const Film = require("../models/filmModel");

// Setup provider server to verify
//const app = require("express")();
//app.use(require("./product.routes"));
//const server = app.listen("8080");

describe("Pact Verification", () => {
  it("validates the expectations of ProductService", () => {
    let opts = {
      logLevel: "INFO",
      provider: "Films Provider",
      providerBaseUrl: "http://localhost:3000",
      pactUrls: [
        path.resolve(__dirname, "../../pacts/films_client-films_provider.json"),
      ],
      stateHandlers: {
        "Generate Films": () => {
          controller.filmRepository.insert(
            new Film(1, "Indiana Jones", "Indiana Jones", 1980)
          );
        },
      },
    };

    return new Verifier(opts).verifyProvider().finally();
  });
});
