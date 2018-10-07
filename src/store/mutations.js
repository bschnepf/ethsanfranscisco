import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default {
  storeInitWeb3 (state, params) {
    state.web3.coinbase = params[0]
    state.block.blockNumber = params[1]
    state.block.hash = params[2]
    state.block.timeStamp = params[3]
    state.web3.balance = params[4]
    state.user.coinbase = params[5]
    state.user.firstName = params[6]
    state.user.lastName = params[7]
  },
  storeLoginData (state, params) {
    state.login.firstName = params[1]
    state.login.lastName = params[2]
    state.login.new_login = false
    state.login.address = params[0]
  },
  storeTokenData (state, params) {
    state.zenbuToken.address = params[1]
    state.zenbuToken.totalSupply = params[2]
    state.zenbuToken.balances = params[3]
  },
  storeBzzData (state, params) {
    state.bzz.hash = params
    state.bzz.photo_id = params
    state.bzz.photo_id_html = ''
    state.projectContracts.hashs.push(params)
  },
  storeBzzFile (state, params) {
    state.projectContracts.text.push(params)
  },
  setProjectData (state, params) {
    state.project.project_title = params.body.title
    state.project.project_tags = params.body.tags
    state.project.project_description = params.body.description
  },
  storeProjectContractData (state, params) {
    state.project.project_transactionHash = params[0]
    state.project.project_contractAddress = params[1]
    state.project.project_blockNumber = params[2]
    state.project.project_coinbaseAddress = params[3]
  },
  storeZenbuTokens (state, params) {
    state.zenbuToken.symbol = '\\u' + params[0]
    state.zenbuToken.name = params[1]
    state.zenbuToken.address = params[2]
    state.zenbuToken.balances = params[3]
  }
}
