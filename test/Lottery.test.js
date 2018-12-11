 const assert =require('assert');
const ganache = require('ganache-cli');
 const Web3 = require('web3');



 const provider = ganache.provider();
const web3 = new Web3(provider);




const {interface,bytecode} = require('../compile');

let accounts;

let lottery;

beforeEach(async () => {
//get a list of all accounts

accounts = await web3.eth.getAccounts();
//one of those accounts to deploy contract

lottery = await new web3.eth.Contract(JSON.parse(interface))
.deploy({data:'0x' + bytecode, arguments:{} })
.send({from:accounts[0], gas:'1000000' });
});




describe ('Lottery Contract' , () => {
it ('deploys a contract' , () => {
assert.ok(lottery.options.address);

});



it('allows one account to enter' , async () => {
  await lottery.methods.enter().send({
    from:accounts[0],
    value: web3.utils.toWei('0.001', 'ether')
  });

const players = await lottery.methods.getPlayers().call({
  form:accounts[0]
});
assert.equal(accounts[0], players[0]);
assert.equal(1, players.length);
});

it('allows multiple account to enter' , async () => {
  await lottery.methods.enter().send({
    from:accounts[0],
    value: web3.utils.toWei('0.0100001', 'ether')
  });
  await lottery.methods.enter().send({
    from:accounts[1],
    value: web3.utils.toWei('0.0100001', 'ether')
  });
  await lottery.methods.enter().send({
    from:accounts[2],
    value: web3.utils.toWei('0.0100001', 'ether')
  });
const players = await lottery.methods.getPlayers().call({
  form:accounts[0]
});

assert.equal(accounts[0], players[0]);
assert.equal(accounts[1], players[1]);
assert.equal(accounts[2], players[2]);
assert.equal(3, players.length);
});


it('requires a minimum ether' , async ()=> {
try{
  await lottery.methods.enter().send({
    from: accounts[0],
    value:  20
  });
console.log("in try");
  assert(false);
} catch (err) {
  console.log("in catch");
  assert(err);
}

});


});








/*class Car {
  park(){
    return 'stopped';
  }

  drive() {
    return 'vroon';
  }
}

let car;

beforeEach(() => {
car = new Car();

});


describe ('Car' , () => {
it('can park' , () => {
  const car = new Car();
  assert.equal(car.park(), 'stopped');

})

it('can drive' , ()=> {
  const car = new Car();
  assert.equal(car.drive(), 'vroon');
})
})*/
