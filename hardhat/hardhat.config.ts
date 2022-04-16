import 'hardhat-deploy'
import { HardhatUserConfig } from 'hardhat/types'
import * as dotenv from "dotenv";

dotenv.config()

const config: HardhatUserConfig =  {
  solidity: {
    version: '0.8.12',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC,
      }
    },
  },
  paths: {
    sources: "src",
    deploy: 'deploy',
  },
  namedAccounts: {
    deployer: 0,
  }
};

export default config;
