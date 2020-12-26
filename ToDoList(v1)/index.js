const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/mods/Date.js"); 
const app  = express();

let items = [];
let items_work = []; 
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("local"));


//Setting ejs as a view engine
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    let today=date.getWeekDay()+", "+date.getDaysNo();
    res.render("list",{
        listTitle: today,
        addItems  : items
    });//updated on ejs file on view folder
});

app.post("/",(req,res)=>{
    if(req.body.Add==="Work"){
        items_work.push(req.body.add_item);
        res.redirect("/work")
    }
    else{
        items.push(req.body.add_item);
        res.redirect("/");
    }
});

app.get("/work",(req,res)=>{
    res.render("list",{
        listTitle: "Work List",
        addItems  : items_work
    });
});
app.post("/work",(req,res)=>{
    res.redirect("/home");
});
app.listen(3000,()=>{
    console.log("server is started at port 3000");
});