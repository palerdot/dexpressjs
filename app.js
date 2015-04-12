var dexpress = require("./dexpress.js"),
	app = dexpress();

app.getPort();
app.setPort("3030");
app.getPort();

app.get("/greet", function (request, response) {
	response.writeHeader("200", {"Content-Type": "text/html"});
	response.end("<h1><strong>Hello Universe</strong></h1> - Greetings from Dexpress!");
});

app.post("/greet", function (request, response) {
	response.writeHeader("200", {"Content-Type": "text/html"});
	response.end("<h1><strong>Hello Universe - You are posting to greet route</strong></h1> - Greetings from Dexpress!");
});

app.listen("6060");