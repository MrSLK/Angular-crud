const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/dist/angular13-crud"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/angular13-crud/index.html"));
});
app.listen(process.env.PORT || 8080);


// "use strict";

// //Express server configuration
// const express = require("express");
// const compression = require("compression");

// const _port = process.env.PORT || 8080;
// const _app_folder = '/dist/angular13-crud';

// const app = express();
// app.use(compression());

// // ---- SERVE STATIC FILES ---- //
// app.get('*.*', express.static(_dirname + _app_folder, {
//   maxAge: '1y'
// }));

// // ---- SERVE APLICATION PATHS ---- //
// app.all('*', function (req, res) {
//   res.status(200).sendFile(`/`, {
//     root: _app_folder
//   });
// });

// // ---- START UP THE NODE SERVER  ----
// app.listen(_port, function () {
//   console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
// });