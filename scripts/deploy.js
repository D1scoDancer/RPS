const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
    const RPSFactory = await ethers.getContractFactory("RPS");
    console.log("Deploying contract..");
    const RPS = await RPSFactory.deploy();
    await RPS.deployed();
    console.log(`Deployed to: ${RPS.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
