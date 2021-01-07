//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/mods/Date.js"); 
const app  = express();
const mongoose = require("mongoose");
const url      = "mongodb://localhost:27017/todolistDB";

mongoose.connect(url,{ useUnifiedTopology: true, useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("local"));

//Creating Schema for our collection in todolistDB
const itemSchema = new mongoose.Schema({
    task : {
        type : String,
        required : [true,"Task is not define!!"],
        minlength : [!0,"Task is not define!!"]
    }
});

const Task = new mongoose.model("Task",itemSchema);

//Inserting data into tasks collection
const t1 =new Task({
    task : "Wake up"
});
const t2 =new Task({
    task : "Get Breakfast"
});
const t3 =new Task({
    task : "Start Studing"
});

const tasks_items = [t1,t2,t3];
//Setting ejs as a view engine
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    Task.find({},(err,tasks)=>{
            if(tasks.length===0)
            {
                Task.insertMany(tasks_items,(err)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Tasks are added");
                    }
                });
                res.redirect("/");
            }
           console.log(tasks);
           res.render("list",{
                listTitle: "Today",
                addItems  : tasks
            });//render inside list.ejs file on view folder
        }
    );
    let today=date.getWeekDay()+", "+date.getDaysNo();
    
});

app.get("/work",(req,res)=>{
    res.render("list",{
        listTitle: "Work List",
        addItems  : items_work
    });
});

app.post("/",(req,res)=>{
    if(req.body.Add==="Work"){
        const addtask = Task({
            task : req.body.add_item
        });
        addtask.save((err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("New task added");
            }
        });
        res.redirect("/work");
    }
    else{
        const addtask = Task({
            task : req.body.add_item
        });
        addtask.save((err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("New task added");
            }
        });
        res.redirect("/");
    }
});

app.post("/work",(req,res)=>{
    res.redirect("/home");
});

app.post("/delete",(req,res)=>{
    const removeTASK = req.body.checkbox;
    Task.findByIdAndRemove(removeTASK,(err)=>{
        console.log(err);
    });
    res.redirect("/");

});
app.listen(3000,()=>{
    console.log("server is started at port 3000");
});
