const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("RPS", () => {
    let RPSFactory, RPS;
    beforeEach(async function () {
        RPSFactory = await ethers.getContractFactory("RPS");
        RPS = await RPSFactory.deploy();
    });

    it("Owner is set in constructor", async function () {
        assert.notEqual("0x0", await RPS.getGameMaster());
    });
});
