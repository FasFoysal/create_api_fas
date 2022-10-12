const mongoose = require("mongoose");
var validator = require('validator');

main().then(()=>console.log('Connnet success mongo')).catch( (err)=> console.log('Disconnect to mongo'));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/Fas'); 
};
const condition = new mongoose.Schema({
  name:String,
  roll:{
    type:Number,
    unique:true,
    minLingth:1,
    maxLength:2
  },
  class:{
    type:Number,
    minLingth:1,
    maxLength:2
  },
  gmail:{
type:String,
unique:true,
validate(val){
    if(!validator.isEmail(val)){
      // Error "E" shout be capital latter
      throw new Error("Email Not valid");
    }
}
  }
})
const database = mongoose.model('studentsList', condition);
module.exports = database;