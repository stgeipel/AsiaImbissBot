const express = require('express');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const Admin = require('../models/madmin')
const api = express();

module.exports.runAPI = async () => {
    api.listen(3000, () => {
        console.log('API up and running!');
    });

    addRoutes();
};


function addRoutes() {

    api.use(cookieParser(), function (req, res, next) {
        console.log("test");
        console.log("cookies " + req.cookies["Cookie_1"])

        if (req.cookies['Cookie_1']) {
            const a = req.cookies['Cookie_1'].split('#')

            mongoose.connect("mongodb://localhost/soe", { useNewUrlParser: true })
            Admin.findOne({ serverid: a[0], clientid: a[1] }, function (e, a) {
                console.log('admin.login ' + a.serverid + ' ' + a.clientid)
                if (a) next()
                else res.status(401);
            })
        }
        res.status(401);
    });

    
    api.get('/', (req, res) => {
        res.send('Hello, world!');
    });
}
