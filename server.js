// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Handle requests to the API
app.get("/api/whoami", (req, res) => {
  // Get client ip
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let ipArray = ip.split(",");
  
  // Get client browser language
  let acceptedLanguage = req.headers['accept-language'];
  
  // Get client system information
  let sysInfo = req.headers['user-agent'];
  
  res.json({ipaddress: ipArray[0],
            language:  acceptedLanguage,
            software:  sysInfo});
});


// Handle requests to a resource that doesn't exist (is not implemented)
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
