'use strict';

let url_parser = require('url')
let http = require('http')
let fs =require("fs");
let mustache = require('mustache');
let request = require('request');
let url2;
let result;
let city;
let html_doc = fs.readFileSync('./index.html').toString();

let server = http.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/html'});
    let url = url_parser.parse(req.url, true);
    city = url.query.city;
    url2 = 'https://api.openweathermap.org/data/2.5/weather?q=Ibekkaren&appid=620d84604500582ade540ab962c47c4a&units=metric&lang=fr';
    request(url2, (err, res2, body) => {
        var date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let currentTime = hours.toString()+":"+minutes.toString();
        let data = JSON.parse(body);
        data.currentTime = currentTime;
        result = mustache.render(html_doc,data);
        res.end(result);
    }); 
});
server.listen(4000);



