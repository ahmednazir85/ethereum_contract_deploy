//require ('./contracts/Inbox.sol'); compiler will think that Inbox.sol in JS code so we
//will not use that


const path = require('path');
const fs = require('fs');
const solc = require('solc');


const lotteryPath =  path.resolve(__dirname, 'contracts','A10test.sol');
const source = fs.readFileSync(lotteryPath,'utf8');

console.log(solc.compile(source,1));
module.exports= (solc.compile(source,1)).contracts[':A10test'];
