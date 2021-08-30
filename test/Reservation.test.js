const { assert } = require('chai')

const Reservation = artifacts.require("./Reservation.sol")
 
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Reservation', (accounts) => {
    let contract

    before(async () => {
        contract = await Reservation.deployed()
    })

    describe('deployment', async() => {
        it('deploys successfully', async () => {
            contract = await Reservation.deployed()
            const address = contract.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, '')
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await contract.name()
            assert.equal(name, 'Reservation')
        })
        it('has a symb', async () => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'RESERVATION')
        })
    }) 
    describe('minting', async() => {
        it('Creates a new token', async () => {
           await contract.mint('0xBd9f371B596c2A7442Ad587D91329e5d6704E102', 'Smith John', 2, 1589343013, 'the uri string')  
           const totalSupply = await contract.the_total_Supply()
           assert.equal(totalSupply.toNumber(), 1, 'is totalSupply')
 
        })
    })
 
})