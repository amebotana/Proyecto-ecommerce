const express = require("express") // importamos el modulo express para poder usarlo.
const path = require("path")
const cors = require("cors")

const app = express()
app.use(cors())

app.get("/test", function (req, res) {
    res.sendFile(path.join(__dirname, "archivo.txt"));
});

app.get("/jsoncategories", function (req, res) {
    res.sendFile(path.join(__dirname, "/JSON/categories.json"));
});

app.get("/jsonpublish", function (req, res) {
    res.sendFile(path.join(__dirname, "/JSON/publish.json"));
});

app.get("/jsoncategoryinfo", function (req, res) {
    res.sendFile(path.join(__dirname, "/JSON/categoryinfo.json"));
});

app.get("/jsonproducts", function (req, res) {
    res.sendFile(path.join(__dirname, "/JSON/products.json"));
});

app.get("/jsonproductinfo", function (req, res) {
    res.sendFile(path.join(__dirname, "/JSON/productinfo.json"));
});

app.get("/jsoncartinfo", function (req, res) {
    res.sendFile(path.join(__dirname, "/JSON/cartinfo.json"));
});

app.get("/jsonproductcomments", function (req, res) {
    res.sendFile(path.join(__dirname, "/JSON/productcomments.json"));
});

app.get("/jsoncartbuy", function (req, res) {
    res.sendFile(path.join(__dirname, "/JSON/cartbuy.json"));
});




app.listen(3000, function () {
    console.log("tamos ready")

})