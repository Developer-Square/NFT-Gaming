# NFT-Gaming
An online mutliplayer card game built to interact with the Core Wallet instead of Metamask, strictly because of speed purposes. The site is built solely using React 
and Solidity.
The contract is deployed on the Avalanche Blockchain and hence uses AVAX as the cryptocurrency of choice. Using AVAX, you can register your player name, create or join
a battle, etc.

For beginners:
 - Download and install the Core Wallet browser extension
 - You can get some fake AVAX tokens to start with using Avax Faucet...https://faucet.avax.network/
 - Then register your player, create a battle and wait for someone to join
 - Have a partner repeat the process above so that you can someone to play with.
 - If you're lonely and don't have a partner😂😂(Welcome to the club!), you can create more accounts on the Core Wallet.
 - Simply switch to another account and join the battle you made in step 3, keep switching between the two accounts until you win or lose the battle.

Game Rules:
  'Card with the same defense and attack point will cancel each other out.',
  'Attack points from the attacking card will deduct the opposing player’s health points.',
  'If P1 does not defend, their health wil be deducted by P2’s attack.',
  'If P1 defends, P2’s attack is equal to P2’s attack - P1’s defense.',
  'If a player defends, they refill 3 Mana',
  'If a player attacks, they spend 3 Mana'
