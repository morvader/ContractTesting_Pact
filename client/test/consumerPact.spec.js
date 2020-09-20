const chai = require("chai");
const path = require("path");
//const chaiAsPromised = require('chai-as-promised')
const { Pact } = require("@pact-foundation/pact");
const expect = chai.expect;
const API_PORT = process.env.API_PORT || 5678;
//chai.use(chaiAsPromised)

const PactResponses = require("./PactResponses");
const FilmsService = require("../FilmsServiceClient");
const Film = require("../model/filmClientModel");
// Configure and import consumer API
// Note that we update the API endpoint to point at the Mock Service
const LOG_LEVEL = process.env.LOG_LEVEL || "WARN";

const provider = new Pact({
  consumer: "Films Client",
  provider: "Films Provider",
  port: API_PORT,
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  dir: path.resolve(process.cwd(), "pacts"),
  logLevel: LOG_LEVEL,
  spec: 2,
  tags: ["films"],
  providerVersion: 1.0,
});

var endPoint = "http://localhost:" + API_PORT;

describe("Pact for Film Provider", () => {
  before(() => {
    filmService = new FilmsService(endPoint);
    return provider.setup();
  });

  // Write pact interations to file
  after(() => {
    return provider.finalize();
  });
  describe("Get all films", () => {
    before(() => {
      return provider.addInteraction({
        state: "Generate films",
        uponReceiving: "Get all films",
        withRequest: {
          method: "GET",
          path: "/films/",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: PactResponses.allFilmsResponse,
        },
      });
    });

    it("returns all films", () => {
      return filmService.getAllFilms().then((response) => {
        expect(response).to.deep.members([
          new Film(1, "Star Wars", "Space", 1980),
          new Film(2, "Superman", "Comic", 1986),
          new Film(10, "Indiana Jones", "Adventures", 1985),
        ]);
      });
    });
  });
  describe("Get film by ID", () => {
    before(() => {
      provider.addInteraction({
        state: "Generate films",
        uponReceiving: "Get film by ID",
        withRequest: {
          method: "GET",
          path: "/films/1",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: PactResponses.oneFilmResponse,
        },
      });
      provider.addInteraction({
        state: "Generate films",
        uponReceiving: "film not found when getting",
        withRequest: {
          method: "GET",
          path: "/films/99",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 404,
        },
      });
      provider.addInteraction({
        state: "Clear repo",
        uponReceiving: "film not found when empty repo",
        withRequest: {
          method: "GET",
          path: "/films/3",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 404,
        },
      });
    });

    it("returns one film", () => {
      return filmService.getFilmById(1).then((response) => {
        expect(response).to.deep.equal(new Film(1, "Star Wars", "Space", 1980));
      });
    });
    it("returns not found when reporsitory is empty", () => {
      return filmService.getFilmById(3).then((response) => {
        expect(response.statusCode).to.be.eq(404);
      });
    });
    it("returns not found when film does not exist", () => {
      return filmService.getFilmById(99).then((response) => {
        expect(response).to.be.not.null;
        expect(response.statusCode).to.be.eq(404);
      });
    });
  });
  describe("Update Film", () => {
    const film = {
      id: 1,
      Name: "Change Name",
      Description: "Space",
      Year: 2020,
    };

    before(() => {
      provider.addInteraction({
        state: "Generate films",
        uponReceiving: "Update Film by ID",
        withRequest: {
          method: "PUT",
          path: "/films/1",
          headers: {
            "Content-Type": "application/json",
          },
          body: film,
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            film: {
              id: 1,
              Name: "Change Name",
              Description: "Space",
              Year: 2020,
            },
          },
        },
      });
      provider.addInteraction({
        state: "Generate films",
        uponReceiving: "film not found when updating",
        withRequest: {
          method: "PUT",
          path: "/films/99",
          headers: {
            "Content-Type": "application/json",
          },
          body: film,
        },
        willRespondWith: {
          status: 404,
        },
      });
    });

    it("returns one film", () => {
      return filmService
        .updateFilm(1, JSON.stringify(film))
        .then((response) => {
          expect(response).to.deep.equal(
            new Film(1, "Change Name", "Space", 2020)
          );
        });
    });
    it("returns not found when film does not exist", () => {
      return filmService
        .updateFilm(99, JSON.stringify(film))
        .then((response) => {
          expect(response).to.be.not.null;
          expect(response.statusCode).to.be.eq(404);
        });
    });
  });
});
