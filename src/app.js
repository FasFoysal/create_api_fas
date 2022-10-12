const express = require("express");
const app = express();
 
require('./monConn');
const database = require("./monConn");
app.use(express.json());
const port = process.env.PORT ||80;
app.post('/add',async (req,res)=>{
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
app.listen(port,()=>{
 console.log(`port open in ${port}`)
})
