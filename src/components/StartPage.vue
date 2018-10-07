<template>
  <div id="StartPage">
    <div class= container>
      <div class="row">
        <div class="col-md-12">
          Hi zenbu
          <div class="header">
            <h3>Zenbu's Blockchain Explorer and Contract Creator</h3>
          </div>
          <div class="jumbotron">
            <h6>Coinbase Address:</h6> <i> {{ coinbase }} </i><hr>
            <h6>Balance:</h6> <i> {{ balance }} </i><hr>
            <h6>Latest Block Number: </h6> <i> {{ blockNumber }} </i><hr>
            <h6>Latest Block Timestamp:</h6> <i> {{ blockTimeStamp }}</i><hr>
            <h6>Latest Block Hash: </h6><i> {{ blockHash }}</i><hr>
            <h6>Contract String: </h6> <i> {{ contractString }}</i><hr>
            <h6>Full Name: </h6><i> {{ firstName }} {{ lastName }}</i><hr>
            <br>
            <h5>Transact Example</h5>
            <div>
              <input v-model="recipient" type="text" placeholder="to">
              <input v-model="sendVal" type="text" placeholder="Value in Wei">
            </div>
            Sending to {{ recipient }} an amount of {{ sendVal }}
            <div>
              <button @click="sendTransaction(recipient, sendVal)">Send Ether</button>
            </div>
            <h5>Create a contract</h5>
            <div>
              <button @click="createContract ()">Create My Contract</button>
            </div>
            <h5>Send some Coins</h5>
            <div>
              <input v-model="recipientAddress" type="text" placeholder="to">
              <input v-model="sendVal" type="text" placeholder="Value in Wei">
              <input v-model="prvateKey" type="text" placeholder="privateKey">
              <button @click="sendSomeCoins (recipientAddress, sendVal, prvateKey)">Send Coins from Contract</button>
            </div>
          </div>
            <br>
            <router-link to="/" exact>GO !</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  created () {
    this.$store.dispatch('initWeb3')
  },
  computed: {
    ...mapGetters({
      coinbase: 'coinbase',
      balance: 'balance',
      blockNumber: 'blockNumber',
      blockTimeStamp: 'blockTimeStamp',
      blockHash: 'blockHash',
      contractString: 'contractString',
      firstName: 'firstName',
      lastName: 'lastName'
    })
  },
  methods: {
    sendTransaction (recipient, sendValue) {
      let params1 = [recipient, sendValue]
      this.$store.dispatch('sendEther', params1)
    },
    createContract () {
      this.$store.dispatch('createContract')
    },
    sendSomeCoins (receiverAddress, amountToSend, prvateKey) {
      let params2 = [receiverAddress, amountToSend, prvateKey]
      this.$store.dispatch('sendSomeCoins', params2)
    }
  },
  name: 'StartPage'
}
</script>

<style scoped>

</style>
