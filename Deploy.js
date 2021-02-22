const Web3 = require('web3');

const { artifacts, bytecode } = require('./compile');
const provider = 'http://127.0.0.1:8545';
const web3 = new Web3(provider);

const setDefaultAccount = (account)=> {
    web3.eth.defaultAccount = account;
}

// console.log(setDefaultAccount);

web3.eth.getAccounts().then(
    (accounts)=>setDefaultAccount(accounts[0])
);

const transit = new web3.eth.Contract(artifacts);

const trx = transit.deploy({
    data: bytecode
});

const trxInstance = trx.send({
    from: '0xA63129afcF0fC80806C029a8fbA18A399b1fEa30',
    gas: '3000000',
    gasPrice: '1000000'
}, (err, trxhash)=>console.log("Success")).then(
    (instance)=>instance.methods.total_Tasks().call().then(console.log)
);