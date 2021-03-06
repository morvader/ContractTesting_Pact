from flask import Flask
from flask import jsonify
from flask import request
from flask import abort

app = Flask(__name__)

@app.route("/init/", methods=["POST"])
def initFilms():
    print ('Initializing...')
    resp = jsonify(success=True)
    return resp
    

@app.route("/")
def index():
    return "hello"


@app.route("/films/", methods=["GET"])
def getfilms():
    data = {
        "films": [
            {"id": 1, "Name": "Star Wars", "Description": "Space", "Year": 1980},
            {"id": 2, "Name": "Superman", "Description": "Comic", "Year": 1986},
            {"id": 3, "Name": "Indiana Jones","Description": "Adventures","Year": 1985},
        ]
    }
    return jsonify(data)


@app.route("/films/<id>", methods=["GET"])
def getFilByID(id):
    if id == '99':
        abort(404)
    data = {"film": {"id": 1, "Name": "Star Wars", "Description": "Space", "Year": 1980}}
    return jsonify(data)

@app.route("/films/", methods=["POST"])
def postNewFilm():
    data = request.get_json()
    return jsonify(data)

@app.route("/films/<id>", methods=["DELETE"])
def deleteFilm(id):
    resp = jsonify(response = "Film Deleted")
    return resp


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3030)

