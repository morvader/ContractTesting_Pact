## INIT PROJECT
npm init

mkdir api
mkdir api/controllers api/models api/routes
touch api/controllers/filmsController.js api/models/filmsModel.js api/routes/filmsRoutes.js

npm install --save-dev nodemon
npm install express --save

add "start": "nodemon server.js" to packaje.json
Run the API -> npm run start

## ADD TEST
npm install mocha chai --save-dev
npm i --save-dev sinon
