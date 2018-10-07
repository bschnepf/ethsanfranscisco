var Web3 = require('web3')
var sleep = require('sleep')

//  Init vars
var gethServerURL = 'http://localhost:8545'
//var account = '0xa74dca289a9674edf2ba4c68ab8ecacde3f0b780'
var account = '0x4c16c4c7dc7d4b241b2164da31f7c397e2d57c71'
var balance = 0.0
var transaction = 0.0
var web3

if (process.send === undefined) {
  //This is not a child proccess
  console.log('standalone mode')
  Start()
}

function emit(message){
  if (process.send === undefined) {
    console.log(message)
  }
  else{
    process.send(message)
  }
}


function Start() {

  web3 = new Web3(new Web3.providers.HttpProvider(gethServerURL))

  if(!web3.isConnected()){
    console.log('geth not connected')
    setTimeout(Start,2000)
    return
  }
  emit('geth:' + gethServerURL)
  emit('coinbase:' + account)
  console.log(web3.eth.syncing)
  // Check If the server is in Sync
  while (web3.eth.syncing) {
    sleep.sleep(3)
    console.log('...waitin to be in Sync ')
  }
  // Unlock Account
  web3.personal.unlockAccount(account, 'yourpasswordhere')

  //update Balance
  balance = web3.fromWei(web3.eth.getBalance(account), 'ether')
  emit('balance:' + balance)
  emit('inSync')

  const filter = web3.eth.filter('latest')
  filter.watch((err, res) => {
    if (err) {
      console.log(`Watch error: ${err}`)
    } else {
      // Update balance
      web3.eth.getBalance(account, (err, bal) => {
        if (err) {
          console.log(`getBalance error: ${err}`);
        } else {
          var newBalance = web3.fromWei(bal, "ether")
          if (newBalance>balance) {
            var diff = newBalance - balance
            balance = newBalance
            transaction = diff
            emit('balance:' + balance)
            emit('transaction:' + transaction)
          }
        }
      });
    }
  });

}

process.on('message', function(m) {
  if (m == 'Start') {
    Start();
  }
});
