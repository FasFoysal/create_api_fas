const { assert } = require("console");
const express = require("express");
const app = express();
const fs = require("fs");
const hbs = require('hbs');
const path = require("path");
const { nextTick } = require("process");

require('./monConn');
const database = require("./monConn");
app.use(express.json());
const port = process.env.PORT ||80;

const partialPath = path.join(__dirname,"../template/partials");
const viewsPath = path.join(__dirname, '../template');
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')))
app.use('/style', express.static(path.join(__dirname, '../template/style')))
app.set('views',viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);
app.use(express.urlencoded());


app.get("/",(req,res)=>{
  res.render("index")
 })
app.get("/students", (req,res)=>{
  res.render("students")
 })

 app.post("/students", async(req,res)=>{
  try{
    let getRoll =  req.body.getRoll;
    console.log(getRoll)
    const studentData = await database.find({roll:getRoll});
    studentData.map(val=>{
      res.status(200).render("students",{name:val.name,class:val.class,roll:val.roll,gmail:val.gmail,id:val._id})
    }) 
    res.status(200).render("students",{notMatch:"Roll not Match"})
    console.log(studentData)
  }catch(err){
    res.status(200).render("students",{notMatch:"Roll not Match"})
  }
 })

// get show all datas
 app.get("/student",async(req,res)=>{
    try{
      const studentData = await database.find().sort({roll:1});
      res.send(studentData);
    }catch(err){
      res.status(401).send("Some thing wrong"+err);
    }
    })

// post add data
app.post('/student',async (req,res)=>{
  try{
    const finalData = new database(req.body);
    await finalData.save()
    res.status(201).send(finalData);
    console.log(finalData);
  }catch(err){
    res.status(400).send('data not send something wrong')
  }
 })
 
// get singal data
app.get("/student/:roll",async(req,res)=>{
  try{
    const _id = req.params.roll;
     const studentSD = await database.find({roll:_id});
     res.send(studentSD).status(200);
  }catch(err){
    res.status(401).send("Some thing wrong"+err);
  }
  })
// patch / update data
app.patch("/student/:id",async(req,res)=>{
    try{
      const id = req.params.id;
       const studentSd = await database.findByIdAndUpdate(id,req.body,{new:true});
       res.send("update success"+studentSd).status(200);
    }catch(err){
      res.status(401).send("Some thing wrong"+err);
    }
    })
// delete    
app.delete("/student/:roll", async(req,res)=>{
  try{
    const roll = req.params.roll;
    const del = await database.deleteOne({roll:roll});
    res.status(200).send(del);
  }catch(err){
    res.status(500).send("Something is wrong data not"+err)
  }
})

// port connections
app.listen(port,()=>{
 console.log(`port open in ${port}`)
})