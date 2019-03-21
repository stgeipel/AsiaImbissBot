const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

class WebSocket {
  constructor(token, port, client) {
    this.token = token;
    this.client = client;
    this.app = express();

    this.app.engine(
      "hbs",
      hbs({
        extname: "hbs", // Extension (*.hbs Files)
        defaultLayout: "layout", // Main layout -> layouts/layout.hbs
        layoutsDir: __dirname + "/layouts" // Layouts directory -> layouts/
      })
    );
    // Set folder views/ as location for views files
    this.app.set("views", path.join(__dirname, "views"));
    // Set hbs as view engine
    this.app.set("view engine", "hbs");
    // Set public/ as public files root
    this.app.use(express.static(path.join(__dirname, "public")));
    // Register bodyParser as parser for Post requests body in JSON-format
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.registerRoots();

    this.server = this.app.listen(port, () => {
      console.log(`Socket is listen on Port ${port}`);
    });
  }

  checkTocken(_token) {
    return _token == this.token;
  }

  registerRoots() {
    //calling http://localhost:Port?token=xxxx
    this.app.get("/", (req, res) => {
      var token = req.query.token;

      if (!this.checkTocken(token)) {
        res.render("error", { title: "Error", errtype: "invalid Token" });
        return;
      }
      res.render("index", { title: "Sons of Eredar Bot Dashboard" });
    });
  }
}

module.exports = WebSocket;
