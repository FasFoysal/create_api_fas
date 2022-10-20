const express = require("express")
const router = new express.Router();
const database = require("./monConn")

// app file -----//
// app.use(express.json());

//------
// post add data
router.post('/student',async (req,res)=>{
    try{
      const finalData = new database(req.body);
      await finalData.save()
      res.status(201).send(finalData);
      console.log(finalData);
    }catch(err){
      res.status(400).send('data not send something wrong')
    }
   })
   
   // get show all datas
   router.get("/student",async(req,res)=>{
   try{
      const studentData = await database.find();
      res.send(studentData).status(200);
   }catch(err){
     res.status(401).send("Some thing wrong"+err);
   }
   })

   // get singal data
   router.get("/student/:roll",async(req,res)=>{
     try{
       const _id = req.params.roll;
        const studentSD = await database.find({roll:_id});
        res.send(studentSD).status(200);
     }catch(err){
       res.status(401).send("Some thing wrong"+err);
     }
     })

   // patch / update data
   router.patch("/student/:id", async(req,res)=>{
     try{
       const id = req.params.id;
       const senD = await database.findByIdAndUpdate(id,req.body,{
         new:true
       });
       res.send(senD).status(200);
     }catch(err){
       res.status(500).send(err)
     }
   })

   router.delete("/student/:roll", async(req,res)=>{
     try{
       const roll = req.params.roll;
       const del = await database.deleteOne({roll:roll});
       res.status(200).send(del);
     }catch(err){
       res.status(500).send("Something is wrong data not"+err)
     }
   })

module.exports = router;