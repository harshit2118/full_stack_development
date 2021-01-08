//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/mods/Date.js"); 
const _ = require("lodash");
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

//Creating list schema
const listSchema = new mongoose.Schema({
    Name : String,
    items : [itemSchema]
});
const List = new mongoose.model("List",listSchema);

//Setting ejs as a view engine
app.set('view engine','ejs');

//All get Methods

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
});

app.get("/:customListTitle",(req,res)=>{
    const customListTitle = _.capitalize(req.params.customListTitle);
    
    List.findOne({Name: customListTitle}, (err,foundList)=>{
        if(!err){
            if(!foundList){
                const list = new List({
                    Name  : customListTitle,
                    items : tasks_items
                }); 
                list.save((err)=>{
                    if(!err){
                        console.log("Item added");
                    }
                });
                res.redirect("/"+customListTitle);
            }
            else{
                res.render("list",{
                    listTitle : foundList.Name,
                    addItems  : foundList.items
                });
            }
            
        }
    });
});


//All post Methods

app.post("/",(req,res)=>{
    const taskName = req.body.add_item;
    const listName = req.body.add_list;
        
        const addtask = Task({
            task : req.body.add_item
        });
        if(listName==="Today")
        {
            addtask.save((err)=>{
                if(err)
                {
                    console.log(err);
                }
            });
            res.redirect("/");
        }
        else{
            List.findOne({Name: listName},(err,foundList)=>{
                foundList.items.push(addtask);
                foundList.save((err)=>{
                    console.log(err);
                });
                res.redirect("/"+listName);            
            });
        }
});

app.post("/delete",(req,res)=>{
    const removeTASK = req.body.checkbox;
    const ListName   = req.body.listName;

    if(ListName==="Today"){
        Task.findByIdAndRemove(removeTASK,(err)=>{
            console.log(err);
        });
        res.redirect("/");
    }
    else{
        List.findOneAndUpdate({Name:ListName},{$pull:{items:{_id: removeTASK}}},(err,foundList)=>{
            if(!err){
                res.redirect("/"+ListName);
            }
        });
    }
    

});

//Starting a local server
app.listen(3000,()=>{
    console.log("server is started at port 3000");
});
