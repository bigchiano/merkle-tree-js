const ethereumjs = require('ethereumjs-abi')
const MerkleTree = require('merkle-tree-solidity').default

const data = [
    {
        address: '0x11',
        balance: '100000000000000000000',
    },
    {
        address: '0x12',
        balance: '100000000000000000000',
    },
    {
        address: '0x13',
        balance: '100000000000000000000',
    },
    {
        address: '0x14',
        balance: '100000000000000000000',
    },
    {
        address: '0x15',
        balance: '100000000000000000000',
    },
    {
        address: '0x16',
        balance: '100000000000000000000',
    },
]

// create merkle tree
// expects unique 32 byte buffers as inputs (no hex strings)
// if using web3.sha3, convert first -> Buffer(web3.sha3('a'), 'hex')
const elements = data.map((e) =>
    ethereumjs.soliditySHA3(['address', 'uint256'], [e.address, e.balance])
)
const merkleTree = new MerkleTree(elements)

// get the merkle root
// returns 32 byte buffer
const root = '0x' + merkleTree.getRoot().toString('hex')

// get a leaf
const leaf = '0x' + elements[4].toString('hex')
// generate merkle proof of the leaf
const proof = merkleTree
    .getProof(elements[4])
    .map((p) => '0x' + p.toString('hex'))

// log data
console.log({ proof, leaf, root })
