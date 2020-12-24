const express = require("express");
const bodyParser = require("body-parser");

const app  = express();
 var items = [];
app.use(bodyParser.urlencoded({extended:true}));

//Setting ejs as a view engine
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    var options = {
        weekday: 'long',
        day    : 'numeric',
        month  : 'long'

    };
    var today = new Date().toLocaleDateString("en-US",options);
    res.render("list",{
        kindOfday: today,
        addItems  : items
    });//updated on ejs file on view folder
});

app.post("/",(req,res)=>{
    items.push(req.body.add_item);
    res.redirect("/");
});


app.listen(3000,()=>{
    console.log("server is started at port 3000");
});