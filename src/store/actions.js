import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Web3 from 'web3'
import util from 'ethereumjs-util'
import Tx from 'ethereumjs-tx'
// import source from '../../contracts/me.json'
// import source from '../../contracts/metaCoin.json'

Vue.use(Vuex)
Vue.use(VueResource)

export default {
  initWeb3 (context) {
    var gethServerURL = 'http://localhost:8545'
    var web3
    web3 = new Web3(new Web3.providers.HttpProvider(gethServerURL))
    if (!web3.isConnected()) {
      console.log('geth not connected')
    }
    // console.log(web3.eth.syncing)
    var coinbase = web3.eth.coinbase
    while (web3.eth.syncing) {
      console.log('...waitin to be in Sync ')
    }
    var blockNumber = web3.eth.blockNumber
    var hash = web3.eth.getBlock(blockNumber).hash
    var timeStamp = web3.eth.getBlock(blockNumber).timestamp
    var balance = web3.eth.getBalance(coinbase)
    var contractAddress = '0xad4cb3e16b057c75e2bcdb71ebab8d3d7522d6a5'
    var contractString = JSON.stringify(web3.eth.getStorageAt(contractAddress))
    var storageObject0 = web3.toAscii(web3.eth.getStorageAt(contractAddress, 0))
    var storageObject1 = web3.toAscii(web3.eth.getStorageAt(contractAddress, 1))
    var params = [coinbase, blockNumber, hash, timeStamp, balance, contractString, storageObject0, storageObject1]
    context.commit('storeInitWeb3', params)
  },
  initZenbuToken (context) {
    var gethServerURL = 'http://localhost:8545'
    var web3
    web3 = new Web3(new Web3.providers.HttpProvider(gethServerURL))
    if (!web3.isConnected()) {
      console.log('geth not connected')
    }
    console.log(web3.eth.syncing)
    var coinbase = web3.eth.coinbase
    while (web3.eth.syncing) {
      console.log('...waitin to be in Sync ')
    }
    // Get a list of all possibile solc versions
    BrowserSolc.getVersions(function (soljsonSources, soljsonReleases) {
      //   console.log(soljsonSources)
      //   console.log(soljsonReleases)
    })
    // Load a specific compiler version
    // BrowserSolc.loadVersion('soljson-v0.4.6+commit.2dabbdf0.js', function (compiler) {
    var zenbuSupply = 100000
    BrowserSolc.loadVersion('soljson-v0.4.6+commit.2dabbdf0.js', function (compiler) {
      var source = 'contract ZenbuToken { uint256 zenbuSupply; mapping (address => uint256) balances; function ZenbuToken() public { zenbuSupply = ' + zenbuSupply + '; balances[msg.sender] = zenbuSupply; } function transfer(address _to, uint256 amount) public returns (bool) { if (balances[msg.sender] >= amount) balances[msg.sender] -= amount; balances[_to] += amount; return true; }}'
      var optimize = 1
      var result = compiler.compile(source, optimize)
      console.log(result)
      var abi = JSON.parse(result.contracts['ZenbuToken']['interface'])
      var code = result.contracts['ZenbuToken']['bytecode']
      var X = web3.eth.contract(abi)
      var createdContract = X.new({from: web3.eth.coinbase, gas: web3.toHex(4712388), data: code})
      console.log('createdToken: ', createdContract)
      var receipt = web3.eth.getTransactionReceipt(createdContract.transactionHash)
      console.log('Transaction receipt: ', receipt)
      var contractAddress = receipt.contractAddress
      console.log('success. Token contract address: ', contractAddress, ' mined in block: ', receipt.blockNumber)
      var contractString = JSON.stringify(web3.eth.getStorageAt(contractAddress))
      var storageObject0 = web3.toDecimal(web3.eth.getStorageAt(contractAddress, 0))
      var storageObject1 = web3.toAscii(web3.eth.getStorageAt(contractAddress, 1)).replace(/\u0000/g, '')
      var params = [contractString, contractAddress, storageObject0, storageObject1]
      context.commit('storeTokenData', params)
    })
  },
  sendEther (context, params) {
    var gethServerURL = 'http://localhost:8545'
    var web3
    var privateKey = '0x' + '3c55d5e84a3ac48e12a484a8f0a794354a6ace4fea3466ba35b3b078dabd1452'
    var publicKey = util.bufferToHex(util.privateToPublic(privateKey))
    console.log('public key: ', publicKey)
    // now ethereum address is the last 160 bit of the sha3-256 keccak hash:
    var address = '0x' + util.bufferToHex(util.sha3(publicKey)).slice(26)
    console.log('Test from address: ', address)
    web3 = new Web3(new Web3.providers.HttpProvider(gethServerURL))
    if (!web3.isConnected()) {
      alert('geth not connected')
    }
    let recipient = params[0]
    let value = params[1]
    console.log('Input to send ', recipient, value)
    // not yet: web3.eth.transact({to: recipient, value: value})
    // example 1: send raw transaction of 1000 wei:
    var rawTx = {
      nonce: web3.toHex(6),
      gasPrice: web3.toHex(20000000000),
      gasLimit: web3.toHex(100000),
      to: '0xd5e0b7e8d73ed373551289c4b61ae560d2667aba',
      value: web3.toHex(10000),
      // data: '0xc0de'
      data: ''
    }
    var p = new Buffer('5b524a53dd2fe13e9742664f55e14e7c9cfa857e28ce01f51fa05b371ede186a', 'hex')
    var transaction = new tx(rawTx)
    // the from address is derived from the signature after signing with the private key
    transaction.sign(p)
    var serializedTx = transaction.serialize()
    console.log('signed Transaction: ', serializedTx.toString('hex'))
    var transactionId = util.bufferToHex(transaction.hash(true))
    console.log('transaction Id: ', transactionId)
    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      console.log('hash: ', err, hash)
    })
    var newBalance1 = web3.eth.getBalance('0x88e99dfcab89108bb62036c9665ba5ec34c154bd')
    console.log(newBalance1.toNumber())
    var newBalance2 = web3.eth.getBalance('0xcfdb50565c796fb3c67c73bbbb37c5815c924572')
    console.log(newBalance2.toNumber())
    // var soliditySource = "contract metaCoin { mapping (address => uint) balances; function metaCoin() { balances[msg.sender] = 10000; } function sendCoin(address receiver, uint amount) returns(bool successful) { if (balances[msg.sender] < amount) return false; balances[msg.sender] -= amount; balances[receiver] += amount; return true; }}";
    // web3.eth.transact({code: '0x' + web3.eth.compile.solidity(soliditySource)});
    // evtl. ist '0x' returned
  },
  createContract (context) {
    var gethServerURL = 'http://localhost:8545'
    var web3
    web3 = new Web3(new Web3.providers.HttpProvider(gethServerURL))
    if (!web3.isConnected()) {
      alert('geth not connected')
    }
    var abi = JSON.parse(source.contracts['Me.sol:Me']['abi'])
    var code = source.contracts['Me.sol:Me']['bin']
    var Me = web3.eth.contract(abi)
    // console.log('look!! YUHUUU: ', abi, code, Me, web3.eth.coinbase)
    // var privateKey = '0x' + '3c55d5e84a3ac48e12a484a8f0a794354a6ace4fea3466ba35b3b078dabd1452'
    // var outputHash = web3.eth.getCode('0xaee2ed6c705bf6b9b84cf9b33efa789b2e2f8c2a')
    // var abi = outputHash.contracts['Me.sol'].interface
    // console.log('abi: ', abi)
    // var soliditySource = 'contract demo { string public name = "Petros"; function changeName(string _newName){name = _newName;}}'
    // var output = solc.compile(soliditySource, 1)
    // for (var contractName in output.contracts) {
    //   console.log(contractName + ': ' + output.contracts[contractName].bytecode)
    //   console.log(contractName + '; ' + JSON.parse(output.contracts[contractName].interface))
    // }
    // var compiled = web3.eth.compile.solidity(soliditySource, function (err, hash) {
    //   console.log('err, hash: ', err, hash)
    // })
    // console.log('compiled contract: ', compiled)
    // console.log('next: ', web3.eth.transact({code: '0x' + web3.eth.compile.solidity(soliditySource)}))
    // var rawTx = {
    //   nonce: web3.toHex(6),
    //   gasPrice: web3.toHex(20000000000), // gasPrice: '0x09184e72a000',
    //   gasLimit: web3.toHex(100000), // gasLimit: '0x2710',
    //   to: '0x0000000000000000000000000000000000000000',
    //   value: '0x00',
    //   data: ''
    // }
    // var tx = new Tx(rawTx)
    // tx.sign(privateKey)
    // var serializedTx = tx.serialize()
    // web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
    //   console.log('err, hash: ', err, hash)
    //   if (hash) {
    //     var receipt = web3.eth.getTransactionReceipt(hash)
    //     console.log('receipt: ', receipt)
    //   }
    // })
    var createdContract = Me.new({from: web3.eth.coinbase, gas: web3.toHex(4712388), data: code})
    console.log('hmmm? hats geklappt?: YUHUU again!! ', createdContract)
    var receipt = web3.eth.getTransactionReceipt(createdContract.transactionHash)
    console.log('deployed yet?: ', receipt)
    var contractAddress = receipt.contractAddress
    console.log('success. Thats it!: ', contractAddress, ' mined in block: ', receipt.blockNumber)
    var contractString = JSON.stringify(web3.eth.getStorageAt(contractAddress))
    var storageObject0 = web3.toAscii(web3.eth.getStorageAt(contractAddress, 0))
    var storageObject1 = web3.toAscii(web3.eth.getStorageAt(contractAddress, 1))
    var hash = receipt.blockHash
    var blockNumber = receipt.blockNumber
    var coinbase = web3.eth.coinbase
    var timeStamp = web3.eth.getBlock(blockNumber).timestamp
    var balance = web3.eth.getBalance(coinbase)
    var params = [coinbase, blockNumber, hash, timeStamp, balance, contractString, storageObject0, storageObject1]
    // var result = web3.eth.call({to: createdContract.getMe(), data: code})
    //  var getData = Me.getMe()
    var functionData = source.contracts['Me.sol:Me']['hashes']['getMe()']
    // var result = web3.eth.sendTransaction({to: contractAddress, from: web3.eth.coinbase, data: functionData })
    var result = web3.eth.call({to: contractAddress, data: functionData})
    console.log('result: ', web3.toAscii(result))
    // var answer = web3.eth.getTransactionReceipt(result)
    // console.log('answer?: ', answer)
    context.commit('storeInitWeb3', params)
  },
  sendSomeCoins (context, params) {
    // params1: receiverAddress
    var gethServerURL = 'http://localhost:8545'
    var web3
    web3 = new Web3(new Web3.providers.HttpProvider(gethServerURL))
    if (!web3.isConnected()) {
      alert('geth not connected')
    }
    var abi = JSON.parse(source.contracts['MetaCoin.sol:MetaCoin']['abi'])
    var code = source.contracts['MetaCoin.sol:MetaCoin']['bin']
    var MetaCoin = web3.eth.contract(abi)
    var createdContract = MetaCoin.new({from: web3.eth.coinbase, gas: web3.toHex(4712388), data: code})
    console.log('createdContract: ', createdContract)
    var receipt = web3.eth.getTransactionReceipt(createdContract.transactionHash)
    console.log('Transaction receipt: ', receipt)
    var contractAddress = receipt.contractAddress
    console.log('success. Contract address: ', contractAddress, ' mined in block: ', receipt.blockNumber)
    // var transferHash = web3.sha3('balances(address)')
    var functionHash = 'f8b2cb4f'
    // var transferHash = web3.sha3('sendToken(address,uint256)')
    var functionHashMulti = '412664ae'
    var receiverAddress = params[0]
    var senderAddress = web3.eth.coinbase.substring(2, 40)
    var functionData = '0x' + functionHash + '000000000000000000000000' + senderAddress
    var sendValue = web3.toHex(params[1]).substring(2, 4)
    var sendValueInHex = '00000000000000000000000000000000000000000000000000000000000000' + sendValue
    var newFunctionDataMulti = '0x' + functionHashMulti + '000000000000000000000000' + receiverAddress + sendValueInHex
    // var callAndDelegateData = web3.eth.call({ to: contractAddress, data: newFunctionData })
    // var callAndDelegateDataMulti = web3.eth.call({ to: contractAddress, data: newFunctionDataMulti })
    var rawTx = {
      nonce: web3.toHex(receipt.blockNumber),
      gasPrice: web3.toHex(20000000000),
      gasLimit: web3.toHex(100000),
      to: contractAddress,
      value: '0x00',
      data: newFunctionDataMulti
    }
    var p = new Buffer(params[2], 'hex')
    var transaction = new tx(rawTx)
    // the from address is derived from the signature after signing with the private key
    transaction.sign(p)
    var serializedTx = transaction.serialize()
    console.log('signed Transaction: ', serializedTx.toString('hex'))
    var transactionId = util.bufferToHex(transaction.hash(true))
    console.log('transaction Id: ', transactionId)
    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      console.log('hash: ', err, hash)
    })
    var callBalance = web3.eth.call({to: contractAddress, data: functionData})
    console.log('sender balance: ', callBalance)
    functionData = '0x' + functionHash + '000000000000000000000000' + receiverAddress
    callBalance = web3.eth.call({to: contractAddress, data: functionData})
    console.log('receiver balance: ', callBalance)
  },
  createLogin (context, params) {
    var gethServerURL = 'http://localhost:8545'
    var web3
    var firstname = params[0]
    var lastname = params[1]
    web3 = new Web3(new Web3.providers.HttpProvider(gethServerURL))
    if (!web3.isConnected()) {
      console.log('geth not connected')
    }
    // Get a list of all possibile solc versions
    var coinbase = web3.eth.coinbase
    console.log('coinbase: ', coinbase)
    BrowserSolc.getVersions(function (soljsonSources, soljsonReleases) {
      // console.log(soljsonSources)
      // console.log(soljsonReleases)
    })
    // Load a specific compiler version
    // BrowserSolc.loadVersion('soljson-v0.4.6+commit.2dabbdf0.js', function (compiler) {
    BrowserSolc.loadVersion('soljson-v0.4.6+commit.2dabbdf0.js', function (compiler) {
      var source = 'contract Me { bytes32 first; bytes32 last;  address owner; function Me() public { owner = msg.sender; first = "' + firstname + '"; last = "' + lastname + '"; } function getMe() public constant returns (bytes32, bytes32) { return (first, last);} function kill() { if (msg.sender == owner) selfdestruct(owner); }}'
      var optimize = 1
      var result = compiler.compile(source, optimize)
      console.log(result)
      var abi = JSON.parse(result.contracts['Me']['interface'])
      var code = result.contracts['Me']['bytecode']
      var X = web3.eth.contract(abi)
      var createdContract = X.new({from: web3.eth.coinbase, gas: web3.toHex(4712388), data: code})
      console.log('createdContract: ', createdContract)
      var receipt = web3.eth.getTransactionReceipt(createdContract.transactionHash)
      console.log('Transaction receipt: ', receipt)
      var contractAddress = receipt.contractAddress
      console.log('success. Contract address: ', contractAddress, ' mined in block: ', receipt.blockNumber)
      var contractString = JSON.stringify(web3.eth.getStorageAt(contractAddress))
      var storageObject0 = web3.toAscii(web3.eth.getStorageAt(contractAddress, 0)).replace(/\u0000/g, '')
      var storageObject1 = web3.toAscii(web3.eth.getStorageAt(contractAddress, 1)).replace(/\u0000/g, '')
      var params = [contractAddress, storageObject0, storageObject1]
      context.commit('storeLoginData', params)
    })
  },
  initProjectContract (context) {
    var gethServerURL = 'http://localhost:8545'
    var web3
    web3 = new Web3(new Web3.providers.HttpProvider(gethServerURL))
    if (!web3.isConnected()) {
      console.log('geth not connected')
    }
    // Get a list of all possibile solc versions
    BrowserSolc.getVersions(function (soljsonSources, soljsonReleases) {
      // console.log(soljsonSources)
      // console.log(soljsonReleases)
    })
    // Load a specific compiler version
    // BrowserSolc.loadVersion('soljson-v0.4.6+commit.2dabbdf0.js', function (compiler) {
    BrowserSolc.loadVersion('soljson-v0.4.23+commit.124ca40d.js', function (compiler) {
      var source = 'contract Projects { struct Project { address projectLeader; string title; string tags; string projectId; uint timestamp; uint donation; uint countDonations; mapping (address => uint) donators; } string public projectHash; address public owner; uint public numProjects; mapping (bytes32 => Project) projects; mapping (uint => bytes32) projectIndex; event ResearchAndDonation(address _from, uint _donation); event ResearchAndProject(address _to, uint _donation); modifier onlyOwner() { if (msg.sender != owner) revert(); _; } constructor() public {  projectHash = "c37f1aa012c82931a01aac5755f333dc76b0f990ef3ace64abb2deacf2092f7c"; owner = msg.sender; numProjects = 0; } function newProject(string _projectIdString, string _title, string _tags, uint _donation) returns (bool) { bytes32 _projectId = stringToBytes(_projectIdString); if (projectExists(_projectIdString)) { return false; } else { Project p = projects[_projectId]; p.projectLeader = msg.sender; p.title = _title; p.tags = _tags; p.projectId = _projectIdString; p.timestamp = block.timestamp; p.donation = _donation; p.countDonations = 0; projectIndex[numProjects] = _projectId; numProjects++; return true; }} function projectExists(string _projectIdString) returns (bool) { bytes32 _projectId = stringToBytes(_projectIdString); if (projects[_projectId].timestamp > 0) { return true; } else { return false; }} function getProjectWithId(string _projectIdString) returns (string) { bytes32 _projectId = stringToBytes(_projectIdString); if (projects[_projectId].donators[msg.sender] == 0) { revert(); } return projects[_projectId].projectId; } function getProjectWithIndex(uint index) returns (string projectId, address projectLeader, string title, string tags, uint timestamp, uint countDonations) { projectId = projects[projectIndex[index]].projectId; projectLeader = projects[projectIndex[index]].projectLeader; title = projects[projectIndex[index]].title; tags = projects[projectIndex[index]].tags; timestamp = projects[projectIndex[index]].timestamp; countDonations = projects[projectIndex[index]].countDonations; } function donationToProject(string _projectIdString) { bytes32 _projectId = stringToBytes(_projectIdString); if (msg.value < 0) { revert(); } projects[_projectId].countDonations += 1; projects[_projectId].donators[msg.sender] = msg.value; } function destroy() { if (msg.sender == owner) { selfdestruct(owner); } } function stringToBytes(string s) returns (bytes32) { bytes memory b = bytes(s); uint r = 0; for (uint i = 0; i < 32; i++) { if (i < b.length) { r = r | uint(b[i]); } if (i < 31) r = r * 256; } return bytes32(r); } }'
      var optimize = 1
      var result = compiler.compile(source, optimize)
      console.log(result)
      var abi = JSON.parse(result.contracts[':Projects']['interface'])
      var code = result.contracts[':Projects']['bytecode']
      var X = web3.eth.contract(abi)
      var createdContract = X.new({from: web3.eth.coinbase, gas: web3.toHex(4712388), data: code})
      console.log('createdContract: ', createdContract)
      var receipt = web3.eth.getTransactionReceipt(createdContract.transactionHash)
      console.log('Transaction receipt: ', receipt)
      var contractAddress = receipt.contractAddress
      console.log('success. Contract address: ', contractAddress, ' mined in block: ', receipt.blockNumber)
      var params = [receipt.transactionHash, receipt.contractAddress, receipt.blockNumber, web3.eth.coinbase]
      context.commit('storeProjectContractData', params)
    })
  },
  storeFileOnBZZ (context, file) {
    Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
    Vue.http.post('http://localhost:5000/bzz-raw:/', file, {headers: {'content-type': 'application/json'}}).then(response => {
      //  Vue.http.post('http://localhost:5000/bzz:/', 'hello world', {headers: {'enctype': 'text/plain'}}
      context.commit('storeBzzData', response.body)
      console.log('store: ', response)
    }, error => {
      console.log('bzz post: no success', error)
    })
  },
  retrieveFileOnBZZ (context, hash) {
    Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
    Vue.http.get('http://localhost:5000/bzz-raw:/' + hash + '/', {headers: {'content-type': 'application/json'}}).then(response => {
      context.commit('storeBzzFile', response)
      console.log('retrieve: ', response)
    }, error => {
      console.log('bzz get: no success', error)
    })
  },
  setProjectData (context, project) {
    context.commit('setProjectData', project)
  },
  createTokens (context) {
    var gethServerURL = 'http://localhost:8545'
    var web3
    web3 = new Web3(new Web3.providers.HttpProvider(gethServerURL))
    if (!web3.isConnected()) {
      console.log('geth not connected')
    }
    var coinbase = web3.eth.coinbase
    console.log('coinbase: ', coinbase)
    // Get a list of all possibile solc versions
    BrowserSolc.getVersions(function (soljsonSources, soljsonReleases) {
      // console.log(soljsonSources)
      // console.log(soljsonReleases)
    })
    // Load a specific compiler version
    // BrowserSolc.loadVersion('soljson-v0.4.6+commit.2dabbdf0.js', function (compiler) {
    BrowserSolc.loadVersion('soljson-v0.4.23+commit.124ca40d.js', function (compiler) {
      var zenbuSymbol = web3.toHex('部')
      var source = 'contract owned { address public owner; function owned() public { owner = msg.sender; } modifier onlyOwner { require(msg.sender == owner); _; } } interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) external; } contract TokenERC20 { string public name; string public symbol; uint8 public decimals = 2; uint256 public totalSupply; mapping (address => uint256) public balanceOf; mapping (address => mapping (address => uint256)) public allowance; event Transfer(address indexed from, address indexed to, uint256 value); event Approval(address indexed _owner, address indexed _spender, uint256 _value); event Burn(address indexed from, uint256 value); function TokenERC20( uint256 initialSupply, string tokenName, string tokenSymbol ) public { totalSupply = initialSupply * 10 ** uint256(decimals); balanceOf[msg.sender] = totalSupply; name = tokenName; symbol = tokenSymbol; } function _transfer(address _from, address _to, uint _value) internal { require(_to != 0x0); require(balanceOf[_from] >= _value); require(balanceOf[_to] + _value > balanceOf[_to]); uint previousBalances = balanceOf[_from] + balanceOf[_to]; balanceOf[_from] -= _value; balanceOf[_to] += _value; emit Transfer(_from, _to, _value); } function transfer(address _to, uint256 _value) public returns (bool success) { _transfer(msg.sender, _to, _value); return true; } function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) { require(_value <= allowance[_from][msg.sender]); allowance[_from][msg.sender] -= _value; _transfer(_from, _to, _value); return true; } function approve(address _spender, uint256 _value) public returns (bool success) { allowance[msg.sender][_spender] = _value; emit Approval(msg.sender, _spender, _value); return true; } function approveAndCall(address _spender, uint256 _value, bytes _extraData) public returns (bool success) { tokenRecipient spender = tokenRecipient(_spender); if (approve(_spender, _value)) { spender.receiveApproval(msg.sender, _value, this, _extraData); return true; } } function burn(uint256 _value) public returns (bool success) { require(balanceOf[msg.sender] >= _value); balanceOf[msg.sender] -= _value; totalSupply -= _value; emit Burn(msg.sender, _value); return true; } function burnFrom(address _from, uint256 _value) public returns (bool success) { require(balanceOf[_from] >= _value); require(_value <= allowance[_from][msg.sender]); balanceOf[_from] -= _value; allowance[_from][msg.sender] -= _value; totalSupply -= _value; emit Burn(_from, _value); return true; } } contract ZenbuToken is owned, TokenERC20 { uint256 public sellPrice; uint256 public buyPrice; mapping (address => bool) public frozenAccount; event FrozenFunds(address target, bool frozen); function ZenbuToken() TokenERC20(20000000, "zenbu", "' + zenbuSymbol + '") public {} function _transfer(address _from, address _to, uint _value) internal { require (_to != 0x0); require (balanceOf[_from] >= _value); require (balanceOf[_to] + _value >= balanceOf[_to]); require(!frozenAccount[_from]); require(!frozenAccount[_to]); balanceOf[_from] -= _value; balanceOf[_to] += _value; emit Transfer(_from, _to, _value); } function mintToken(address target, uint256 mintedAmount) onlyOwner public { balanceOf[target] += mintedAmount; totalSupply += mintedAmount; emit Transfer(0, this, mintedAmount); emit Transfer(this, target, mintedAmount); } function freezeAccount(address target, bool freeze) onlyOwner public { frozenAccount[target] = freeze; emit FrozenFunds(target, freeze); } function setPrices(uint256 newSellPrice, uint256 newBuyPrice) onlyOwner public { sellPrice = newSellPrice; buyPrice = newBuyPrice; } function buy() payable public { uint amount = msg.value / buyPrice; _transfer(this, msg.sender, amount); } function sell(uint256 amount) public { address myAddress = this; require(myAddress.balance >= amount * sellPrice); _transfer(msg.sender, this, amount); msg.sender.transfer(amount * sellPrice); } }'
      var optimize = 1
      var result = compiler.compile(source, optimize)
      console.log(result)
      var abi = JSON.parse(result.contracts[':ZenbuToken']['interface'])
      var code = result.contracts[':ZenbuToken']['bytecode']
      var X = web3.eth.contract(abi)
      var createdContract = X.new({from: web3.eth.coinbase, gas: web3.toHex(4712388), data: code})
      console.log('createdContract: ', createdContract)
      var receipt = web3.eth.getTransactionReceipt(createdContract.transactionHash)
      console.log('Transaction receipt: ', receipt)
      var contractAddress = receipt.contractAddress
      console.log('success. Contract address: ', contractAddress, ' mined in block: ', receipt.blockNumber)
      // var functionData = '06fdde03'
      // var callName = web3.eth.call({to: contractAddress, data: functionData})
      // console.log('call name: ', callName, JSON.stringify(web3.toAscii(callName).replace(/\u0000/g, '')))
      // var functionDataSymbol = '95d89b41'
      // var callSymbol = web3.eth.call({to: contractAddress, data: functionDataSymbol})
      // callSymbol = JSON.stringify(web3.toAscii(callSymbol).replace(/\u0000/g, '')).substring(10, 14)
      // console.log('call symbol: ', callSymbol)
      var fData = 'a9059cbb'
      var receiverAddress = '179910bd5b149971d43199bcafeeeafe77fb5c3b'
      var padReceiverAddress = receiverAddress.padStart(64, '0')
      var transValue = web3.toHex(100)
      transValue = transValue.substring(2, transValue.length)
      var padTransValue = transValue.padStart(64, '0')
      var functionData = '0x' + fData + padReceiverAddress + padTransValue
      // var callBalance = web3.eth.call({to: contractAddress, data: functionData})
      // console.log('receiver balance: ', callBalance, web3.toDecimal(callBalance))
      // var zenbuParams = [callSymbol, web3.toAscii(callName).replace(/\u0000/g, ''), contractAddress, web3.toDecimal(callBalance)]
      // context.commit('storeZenbuTokens', zenbuParams)
      // console.log('login: ', loginAddress)
      console.log('contractAddressControl: ', contractAddress)
      var rawTx = {
        nonce: web3.toHex(receipt.blockNumber),
        gasPrice: web3.toHex(4712388),
        gasLimit: web3.toHex(100000),
        to: contractAddress,
        value: '0x0',
        data: functionData
      }
      // var sendZenbuTransaction = web3.eth.sendTransaction({to: contractAddress, data: functionData})
      // console.log('Transaction log: ', sendZenbuTransaction)
      var p = new Buffer('f4b997429eed2efe7dda32c1d61cd43c7e4cc21ac616bce983dafdb0201a23a6', 'hex')
      var transaction = new Tx(rawTx)
      // the from address is derived from the signature after signing with the private key
      transaction.sign(p)
      var serializedTx = transaction.serialize()
      // console.log('signed Transaction: ', serializedTx.toString('hex'))
      var transactionId = util.bufferToHex(transaction.hash(true))
      console.log('transaction Id: ', transactionId)
      // web3.eth.sendTransaction({data: '0x' + serializedTx.toString('hex')}, function (err, hash) {
      //   console.log('send: ', err, hash)
      // })
      web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        console.log('hash: ', err, hash)
        if (!err) {
          fData = '70a08231'
          functionData = '0x' + fData + padReceiverAddress
          var callddBalance = web3.eth.call({to: contractAddress, data: functionData})
          console.log('receiver balance: ', callddBalance, web3.toDecimal(callddBalance))
        }
      })
      // var receiverddAddress = loginAddress.substring(2, loginAddress.length)
    })
  }
}
