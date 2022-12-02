const { ethers, getNamedAccounts } = require("hardhat")
const { expect, assert } = require("chai")

describe("RPS", () => {
    let deployer
    let RPS
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        const RPSFactory = await ethers.getContractFactory("RPS")
        RPS = await RPSFactory.deploy()
    })

    it("Owner is set in constructor", async function () {
        assert.notEqual("0x0", await RPS.gameMaster())
    })
})
