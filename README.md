# ETH SAN FRANCISCO, October 5 - 7, 2018, CA, USA
Research &amp; Donate Decentralized Application

# Inspiration:
Maybe you already know some people who died because of cancer. Then you search with Google for cancer research projects and found some interesting one. Maybe you would like to donate to an interesting project you've found. This app likes to help you finding reliable projects (worldwide) with the opportunity to donate to it and some useful additional information about the research.

# What it does:
Provides an browser url for an dapp with identity management. You can submit an new research project with title, tags, and description. This will be stored. You can then search for it and view it on the project page. You can see how many money the already collected and can donate to it.

# How I built it:
Build with JavaScript and vuex. Based on the Ethereum testnet. Its a client - server app, which means, that geth and swarm is running on the server, and the browser url client is only rendering the data. The app is device independent and can be accessed from every browser. Metamask for donation is optional, because the user can pay via bank transfer or via metamask. Both kind of donations will be immediatly changed to own tokens and added to the project account. Only research projects which are already evaluated from local research foundations are allowed.

# Challenges I ran into:
The app shall be as simple as possible for the user (e.g. to participate without owning cryptocurrencies or usage of metamask). And the app shall give the opportunity to search and compare the different research projects. Challenges were the client/server configuration and contracts with ethereumjs and a swarm node. The app can be extended with Bloom identity management and additional requests to public research databases.

# Accomplishments that I'm proud of:
The whole concept is in the usage as simple as possible and can be used from people every ages. Even without owning cryptocurrencies or knowledge about it. It runs on every smartphone/device.

# What I learned:
The first idea was developed by myself within the Consensys Developer Program. Within this ETHSF hackathon I've worked further on it and tried to integrate the 'Bloom' identity management.

# What's next for Donate & Research:
Integrate an improved identity management, improve the smart contract design pattern, securify it, and deploy it to the main net before Christmas...
