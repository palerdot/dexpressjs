// Idea - Create a simple routing framework like expressjs in nodejs
// Since routing is nothing but mapping a particular action for the incoming url, all one has
// to do is to manipulate the request url and do something accordingly if something is defined
// DexpressJs does very basic stuff - listen to a port, create a basic 'get' or 'post' route

module.exports = function () {

	var fs = require("fs"), // to read files
		http = require("http"), // to create a basic http server
		path = require("path"), // for fancy things to do with file names and paths
		port = 6060,
		host = "localhost",
		// store the http request, response objects to use across Dexpress modules
		request,
		response,
		// array of functions. Each function has following arguments - route, method, callback
		routesQueue = []; 

	// all the above vars will be private to Dexpress() function
	// and can be accessed through closure.
	// Closure - is nothing but you get access to all the things defined in the same level as the function itself
	function Dexpress () {

		this.setPort = function (newPort) {

			if (parseInt(port, 10)) {
				port = newPort;
			}

		};

		this.getPort = function () {
			console.log("Server running at " + port);
		};

		this.greet = function () {
			console.log("Hello Universe - This is DexpressJs");
		};

		this.listen = function (listenPort) {

			var self = this;

			if (listenPort) {
				this.setPort(listenPort);
			}
			// creating a basic http server 
			http.createServer( function (req, res) {
				self.handleConnection(req, res);
			} ).listen( port, host );

			console.log("Server listening at " + host + ":" + port);

		};	

		this.handleConnection = function (req, res) {

			// just save the request, response objects to use in other modules
			// these are the objects that are used to read HTTP request and send HTTP response respectively
			request = req,
			response = res; 

			routesQueue.forEach( function (config, index) {
				// check if we have a matching route defined
				if (config.route == req.url && ( config.method == "ALL" || config.method == req.method) ) {
					config.callback.call( config.callback, req, res);
				}
			} );
			// if we have come this far there is no route defined and we are in root
			// serve the requested files from the root route
			this.serveNormal();

		};

		this.serveNormal = function () {

			var fileName = '.' + request.url,
				contentType = "text/plain",
				readOptions = {
					encoding: "utf-8"
				},
				extname = path.extname(fileName),
				contentType = this.getContentType(extname);

			if (fileName == './') {
			    fileName = './index.html';
			}

			fs.readFile(fileName, readOptions, function (err, data) {
				response.writeHeader(200, {"Content-Type": contentType});
		        response.end(data);
			});

		};

		this.get = function (route, callback) {

			routesQueue.push( {
				"route": route,
				"method": "GET",
				"callback": callback
			});

		};

		this.post = function (route, callback) {

			routesQueue.push( {
				"route": route,
				"method": "POST",
				"callback": callback
			});

		};

		this.all = function (route, callback) {

			routesQueue.push( {
				"route": route,
				"method": "ALL",
				"callback": callback
			});

		};

		this.getContentType = function (extension) {
			// supports only few major extensions as of now
			switch (extension) {
				case ".html":
					contentType = "text/html";
					break;
			    case '.js':
			        contentType = 'text/javascript';
			        break;
			    case '.css':
			        contentType = 'text/css';
			        break;
			    case '.json':
			        contentType = 'application/json';
			        break;
			    case '.png':
			        contentType = 'image/png';
			        break;      
			    case '.jpg':
			        contentType = 'image/jpg';
			        break;
			    case '.wav':
			        contentType = 'audio/wav';
			        break;
		        default:
		        	contentType = "text/plain";
		        	break;
			}

		};

	}
	// return an instance of Dexpress
	// note: when you return an instance of function, you will get an object.
	return new Dexpress;

};