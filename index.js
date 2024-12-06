let express = require("express");
let app = express();
let path = require("path");
let fs = require("fs");

app.use(express.static(__dirname));
app.use(express.json());

app.route("/")
.get((req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.route("/add-data")
.post((req, res) => {
    let data = req.body;

    fs.writeFileSync("./js/data.json", JSON.stringify(data));
});

app.listen(3000);