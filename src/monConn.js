const mongoose = require("mongoose");
main().then(()=>console.log('Connnet success mongo')).catch( (err)=> console.log('Disconnect to mongo'));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/Fas'); 
};
const condition = new mongoose.Schema({
  name:String,
  roll:Number,
  class:Number,
  gamil:String,
})
const database = mongoose.model('studentsList', condition);
module.exports = database;