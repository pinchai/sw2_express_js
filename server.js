const express = require("express");
const products = require("./product_list")


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<center><h1>Home Page</h1></center>");
});


app.get("/products", (req, res) => {
    res.status(200).json(products.products);
});

app.get("/product{/:category}", (req, res) => {

    let category = req.params.category
    let min_price = req.query.min_price
    let max_price = req.query.max_price

    console.log(min_price, max_price)


    let product_filter_list = []

    //filter product by category
    if (category !== undefined) {
        product_filter_list = products.getProductByCategory(category)
    }

    //filter product by min and max price
    if (min_price !== undefined && max_price !== undefined) {
        product_filter_list = products.getProductByMinMaxPrice(min_price, max_price)
    }

    res.status(200).json(product_filter_list)
});


app.post("/add-product", (req, res) => {
    let form = req.body

    let form_as_string = JSON.stringify(form)

    res.send(`product has been create \n${form_as_string}`)
});

app.put("/edit-product", (req, res) => {
    res.send("product has been update by method put")
});

app.delete("/delete-product", (req, res) => {
    res.send("product has been delete")
});


app.use((req, res, next) => {
    res.status(404).send("<center>Page Not Found</center>");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});