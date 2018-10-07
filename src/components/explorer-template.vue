<template>
  <div class="container">
    <div id="main">
      <my-navbar></my-navbar>
      <hr>
      <div id="explorer">
        Control your transaction:<br><br>
        <i>Coinbase Address: {{ coinbase }} </i><br>
        <i>Balance: {{ balance }} </i><br>
        <i>Latest Block Number: {{ blockNumber }} </i><br>
        <i>Latest Block Timestamp: {{ blockTimeStamp }}</i><br>
        <i>Latest Block Hash: {{ blockHash }}</i><br>
        <i class="material-icons">check_circle</i>
      <br><br>
      </div>
      <h6 style="color: rgb(33, 37, 41);">Written by Betina Schnepf / copyright private</h6>
      <br>
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
      blockHash: 'blockHash'
    })
  },
  methods: {
  },
  name: 'explorerTemplate'
}
</script>

<style scoped>
  #explorer {
  -webkit-text-fill-color: white;
  -moz-text-decoration-color: white;
  color: white;
  padding-left: 0px;
  margin-left: 0px;
  }
  #main {
    font-family: 'Helvetica neue', Arial, sans-serif;
    text-align: center;
    margin-top: 0px;
    margin-bottom: 0px;
    background-color: rgba(0, 0, 0, 0.03);
    background-image: url('/public/zenbuKlein.png');
  }
</style>
