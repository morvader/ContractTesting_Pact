const { Matchers } =  require('@pact-foundation/pact')
const { like, term } = Matchers;

exports.allFilmsResponse = {
    "films": [{
            "id": like(1),
            "Name": "Star Wars",
            "Description": "Space",
            "Year": 1980,
        },
        {
            "id": like(2),
            "Name": "Superman",
            "Description": "Comic",
            "Year": 1986,
        },
        {
            "id": like(10),
            "Name": "Indiana Jones",
            "Description": "Adventures",
            "Year": 1985,
        }
    ]
};

exports.oneFilmResponse = {
    film: {
        "id": 1,
        "Name": "Star Wars",
        "Description": "Space",
        "Year": 1980,
    }
};
