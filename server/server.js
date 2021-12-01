const express = require("express");
const cors = require("cors");
const app = express();

global.__uploadsdir = __dirname + "/uploads/"

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Database
const db = require('./app/models');

db.sequelize.sync();
//  Drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// Routes
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

