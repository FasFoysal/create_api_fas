const express = require("express");
const app = express();

require('./monConn');
const database = require("./monConn");
app.use(express.json());

const port = process.env.PORT ||80;

app.get('/',(req,res)=>{
  res.send("Hello")
})
app.post('/add', async(req,res)=>{
  try{
const finalData = await new database(req.body);
res.status(201).send(finalData);
console.log(finalData);
finalData.save();
  }catch(err){
console.log('data not send')
  }
})
app.listen(port,()=>{
  console.log(`port open in ${port}`)
})