const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const getDate=require(__dirname+"/date.js")

let listEntries=["Buy food","Cook Food","Eat Food"];
let workItems=[];

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.set('view engine', 'ejs');


app.get("/",function(req,res){
let day=getDate.getDate()
  res.render("list", {listTitle:day, newListItems:listEntries})
});

app.get("/work",function(req,res){
  res.render("list",{listTitle:"Work List", newListItems:workItems})
})

app.post("/work", function(req,res){

  let item=req.body.newItem;
  workItems.push(item);
  res.redirect("/work")
})

app.post("/", function(req,res){
  let entry=req.body.newItem;
  if (req.body.list==="Work"){
    workItems.push(entry)
    res.redirect("/work")
  }else{
    listEntries.push(entry)
    console.log(entry);
    res.redirect("/")
  }


});

app.get("/about",function(req,res){
  res.render("about");
})


app.listen(3000, function(){
  console.log("Server is up and running on port 3000")
});
