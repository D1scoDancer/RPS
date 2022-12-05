const { ethers, getNamedAccounts } = require("hardhat")
const { expect, assert } = require("chai")

describe("DelegateCallRPS", async () => {
    let deployer
    let RPS
    let DelegateCallRPS
    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        const RPSFactory = await ethers.getContractFactory("RPS")
        RPS = await RPSFactory.deploy()
        const DelegateCallRPSFactory = await ethers.getContractFactory(
            "DelegateCallRPS"
        )
        DelegateCallRPS = await DelegateCallRPSFactory.deploy()
    })

    it("Delegate Call works", async () => {
        await DelegateCallRPS.registerNewPlayer(RPS.address)
        const playerLeft = await DelegateCallRPS.playerLeft()
        assert.equal(playerLeft, deployer)
    })
})
