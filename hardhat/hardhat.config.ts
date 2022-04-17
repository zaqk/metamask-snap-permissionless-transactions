import 'hardhat-deploy'
import { HardhatUserConfig } from 'hardhat/types'
import * as dotenv from "dotenv";

dotenv.config()

const config: HardhatUserConfig =  {
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC,
      }
    },
  }
};

export default config;
