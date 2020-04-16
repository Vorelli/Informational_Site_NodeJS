let http = require('http');
let url = require('url');
let fs = require('fs');

let index, contact, about, fourOhFour;
let currentData;

fs.readFile('index.html', function(err, data) {
	if(err) console.log(err);
	index = data;
});

fs.readFile('contactMe.html', function(err, data) {
	if(err) console.log(err);
	contact = data;
});

fs.readFile('about.html', function(err, data) {
	if(err) console.log(err);
	about = data;
});

fs.readFile('404.html', function(err, data) {
	if(err) console.log(err);
	fourOhFour = data;
});

http.createServer(function(req, res) {
	let q = url.parse(req.url, true);
	switch(q.pathname) {
		case "/":
		case "":
			currentData = index;
			break;
		case "/about":
		case "/about/":
			currentData = about;
			break;
		case "/contact-me":
		case "/contact-me/":
		case "/contact":
		case "/contact/":
			currentData = contact;
			break;
		default:
			console.log("Executing default");
			currentData = fourOhFour;
			break;
	}
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(currentData);
	res.end();
}).listen(8080);