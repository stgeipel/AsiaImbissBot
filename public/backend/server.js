const express = require('express');
const cookieParser = require('cookie-parser')
const api = express();

module.exports.runAPI = async () => {
    api.listen(3000, () => {
        console.log('API up and running!');
    });

    addRoutes();
};


function addRoutes() {

    api.use(cookieParser(),function (req, res, next) {
        console.log("test");
        console.log("cookies "  + req.cookies["Cookie_1"])
       // console.log("singed cookies " + req.signedCookies)
        next();
    });
    api.get('/', (req, res) => {
        console.log(req);
        res.send('Hello, world!');
    });
}
