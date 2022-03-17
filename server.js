// Define dependencies

const express=require("express");
const fs = require("fs");

const htmlroutes=require('./routes/html');
const apiRoutes=require('./routes/api');

var app = express();
const PORT = process.env.PORT || 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
//app.use("/assets", express.static("./assets"));


app.use(htmlroutes);
app.use(apiRoutes);

app.listen(PORT, () => {
    console.log('Now listening at http://localhost:' + PORT);
});
