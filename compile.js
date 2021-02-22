const path = require('path');
const fs = require('fs');
const solc = require('solc');
// const { settings } = require('cluster');

const webPath = path.resolve(__dirname, 'Contracts', 'TaskManager.sol');
const web = fs.readFileSync(webPath, 'utf-8');

var input = {
    language: 'Solidity',
    sources: {
        'TaskManager.sol': {
            content: web
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

function findImports(path) {
    if(path === 'lib.sol')
    return {
        contents: 'library L {function f() internal returns(uint) {return 7; } }'
    };
    else return { error: 'File not found'};
}

const task = JSON.parse(solc.compile(JSON.stringify(input), {import: findImports})).contracts['TaskManager.sol'].TaskManager;
// console.log(task);

const artifacts = task.abi;
const bytecode = task.evm.bytecode.object;

module.exports = { artifacts, bytecode }
