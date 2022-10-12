const express = require("express");
const app = express();
 
require('./monConn');
const database = require("./monConn");
app.use(express.json());
const port = process.env.PORT ||80;

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
// const finalData = new database(req.body);
// finalData.save().then(()=>{
//   res.status(201).send(finalData);
//   console.log(finalData);
// }).catch((err)=>{
//  res.status(400).send('data not send something wrong')
// })
})

// get show all datas
app.get("/student",async(req,res)=>{
try{
   const studentData = await database.find();
   res.send(studentData).status(200);
}catch(err){
  res.status(401).send("Some thing wrong"+err);
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

// port connections
app.listen(port,()=>{
 console.log(`port open in ${port}`)
})
