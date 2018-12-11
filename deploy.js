const  HDWalletProvider = require ('truffle-hdwallet-provider');

const Web3 = require ('web3');

const {interface,bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'charge produce elephant swift junk glow panic liquid dolphin kite buffalo tonight',
  "http://127.0.0.1:8545"
//  'https://ropsten.infura.io/v3/5dfc204dc19f4e84942c3775f85278d5',1,5
);
//var privateKeys = ["f1afa95f216eb67a8e8ab3a8a9e274f66480baca8b64cc69cbac1e12a6cdc95e", "523e7422472f006bfcfa389252155f2ce833823276bd683fdb81ae0df7eadffb",];
//const provider = new HDWalletProvider("f1afa95f216eb67a8e8ab3a8a9e274f66480baca8b64cc69cbac1e12a6cdc95e", "http://127.0.0.1:8545");

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
console.log(accounts);
  console.log('Deploying form:' , accounts[0]);
const balance = await web3.eth.getBalance(accounts[0]);
console.log('balance is :' , balance);
const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data:'0x' +bytecode, arguments:{}})
  .send({from:accounts[0], gas:'1000000' });

console.log(interface);
console.log('contract deployed to ', result.options.address);

};

deploy();
