# Dexpress.js

Dexpress.js is a very basic web framework for nodejs *(similar to expressjs, hence the name)* created for **learning purpose.** 

All you can do is 
* listen to a particular port
* define simple get and post routes *(no fancy named routes, parameters ... )*. 

The idea is to see how one can implement expressjs like routing framework from scratch in nodejs.

### Basic Usage:
*(or usage of this basic framework, whatever)*
```javascript
var dexpress = require("./dexpress.js"), // or from wherever you have placed this js file
	app = dexpress();

app.listen(); // default port is "6060"
//or
app.listen("3000"); // sets the port to "3000"

// Define a simple 'GET' route
app.get("/greet", function (request, response) {
	response.writeHeader("200", {"Content-Type": "text/html"});
	response.end("<h1><strong>Hello Universe</strong></h1> - Greetings from Dexpress!");
});
// Define a simple 'POST' route
app.post("/greet", function (request, response) {
	response.writeHeader("200", {"Content-Type": "text/html"});
	response.end("<h1><strong>Hello Universe - You are posting to greet route</strong></h1> - Greetings from Dexpress!");
});	
// you can also define an 'ALL' route that gets called for all request methods
app.all("/greet", function (request, response) {
	// do whatever you feel like doing
});
```   

I have been using expressjs for some time without even knowing what is possible in nodejs itself, hence this simple project. This simple framework may expanded once in a while in future. 