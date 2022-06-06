# Metamask Snaps Permissionless Transactions

Proof of concept for a metamask snap that does not prompt the user with a metamask modal before transactions. Requires the installation of a metamask snap that has access to the users private key.

## Installation and running locally

First install [metamask flask](https://metamask.io/flask/) to use snaps.

(I reccomend installing this on a second browser that does not have metamask already installed. two instance of metamask running at the same time will cause issues) 


1. Start up hardhat local node
```bash
- cd hardhat
- update hardhat/.env with your metamask secret phrase
- yarn install
- yarn start
```

2. connect metamask to your hardhat local node
```bash
- metamask => settings => networks => add network
- network name: "hardhat local"
- new rpc url: "http://127.0.0.1:8545" 
- chain id: 31337
- Currency Symbol: ETH
```


2. Start up local snap installation page
```bash
- cd snap
- yarn install
- yarn start
- navigate to localhost:8080 and install metamask snap by clicking the connect button
```

3. Start up local http server
```bash
- cd frontend
- yarn install
- yarn start
- navigate to localhost:3000
```


## Usage
```bash
- Go to localhost:8080 click "approve". this will approve the metamask snap for localhost:3000
- To send a small amount of ETH to the zero address click the "send to zero address" button.
- confirm transaction was sent successfully by checking the console logs and verifying metamask ETH amount has changed.
```
