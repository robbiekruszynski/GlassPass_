# GlassPass

## Description
<b>GlassPass is a private sharing hub for conference side event tickets. Earn reputation for sharing superfluous tickets you hold or secure a last-minute attendance to that one brilliant event!</b>

GlassPass gives new life to forgotten side event tickets. Most side events are oversubscribed and underattended. Those 5 simultaneous events you signed up for? Earn reputation for sharing them with those that actually want to attend. Tickets are securely encrypted on-chain and can only be claimed for 30 minutes by a new owner. The QR code can only be generated on-site as the user's geolocation is compared and verified on-chain. This gives conference-goers the ability to attend that side event that they only saw last-minute after it was sold out and it improves attendance of side events by an order of magnitude, a win-win for both sides.


## How it was made

GlassPass is built on Scaffold-ETH. It implements fully homomorphic encryption to store secrets on-chain and only allows for decryption by the owner. 
<br>
Our client parses a Lu.ma ticket for its event ID, geocoordinates, and private key, which form the ticket on-chain. 

The private key is a string, so we first convert it into a uint256 before encrypting it. 

A ticket on-chain can only be claimed for 30m until it is again available for someone else to claim. Activating the ticket requires the owner to be within 300m of the event venue. 

The ciphertext can then be decrypted by the owner and the frontend generates a QR code to show at the door.

### Contract Deployment 
- Fhenix testnet at address 0x4E68A984EDdf00360CFD76D4a624C0F8dfDDA1df 
<br>
- Base Sepolia at address 0x20EB64a5aA6523A65a9384dE8c13a537c08956b5 
- Arbitrum Sepolia at address 0x20EB64a5aA6523A65a9384dE8c13a537c08956b5 
- Apechain Jenkins at address 0x20EB64a5aA6523A65a9384dE8c13a537c08956b5 
- Inco Gentry at address 0x137be9b2027B24597eFEe14B0000507b556259D4 

### Tech Stack
- Scaffold ETH
- Ethers.js
- Hardhat
- Solidity
- TypeScript
- Tailwind
- Next.js
- FHE 



### Local Deployment 
```
yarn install
yarn chain
yarn start
```
Open http://localhost:3000/

### Issues 
Front end lacking connection to the functions found from the deployed contracts

