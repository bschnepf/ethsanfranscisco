import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default {
  coinbase (state) {
    return state.web3.coinbase
  },
  balance (state) {
    return state.web3.balance
  },
  blockNumber (state) {
    return state.block.blockNumber
  },
  blockTimeStamp (state) {
    return state.block.timeStamp
  },
  blockHash (state) {
    return state.block.hash
  },
  contractString (state) {
    return state.user.coinbase
  },
  firstName (state) {
    return state.user.firstName
  },
  lastName (state) {
    return state.user.lastName
  },
  newLogin (state) {
    return state.login.new_login
  },
  loginFirstName (state) {
    return state.login.firstName
  },
  loginLastName (state) {
    return state.login.lastName
  },
  project (state) {
    return state.project
  },
  projectImg (state) {
    return state.project.project_img
  },
  photoId (state) {
    return state.bzz.photo_id
  },
  photoIdHtml (state) {
    return state.bzz.photo_id_html
  },
  bzzFlag (state) {
    return state.bzz.flag
  },
  allProjects (state) {
    return state.projectContracts.hashs
  },
  allProjectsText (state) {
    return state.projectContracts.text
  },
  loginAddress (state) {
    return state.login.address
  },
  zenbuTokens (state) {
    return [state.zenbuToken.name, state.zenbuToken.symbol, state.zenbuToken.balances]
  }
}
