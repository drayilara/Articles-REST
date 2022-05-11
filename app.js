// jshint esversion:6
const express = require("express");
const bodyParser = require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');
const app = express();

// Get Routes
const routes = require("./routes.js");

// Intercept form data and JSON in request body
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

// Mount Routers
app.use("/api/articles", routes.bulkRouter)
app.use('/api/articles', routes.singleRouter)

 

const PORT = 3000;
app.listen(PORT, () => console.log('Web server running at port ' + PORT));
   



