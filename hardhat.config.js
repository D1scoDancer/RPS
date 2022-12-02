require("@nomiclabs/hardhat-waffle")
require("ethereum-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")

const PRIVATE_KEY = process.env.PRIVATE_KEY
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const ETHERSCAN_API = process.env.ETHERSCAN_AP

module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: `${GOERLI_RPC_URL}`,
            accounts: [`0x${PRIVATE_KEY}`],
            chainId: 5,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API,
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
}
