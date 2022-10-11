const fs = require("fs");

fs.writeFileSync('../text.txt',"hi my name is Foysal ahmed shoun|");
fs.appendFileSync('../text.txt','I am fine how are you|');
fs.appendFileSync('../text.txt','I am not fine how are you|||||');
fs.appendFileSync('../text.txt','|||||... in new one');