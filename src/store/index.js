import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export function createStore () {
  return new Vuex.Store({
    state: {
      currentRoute: null,
      web3: {
        address: '',
        coinbase: '',
        balance: 0,
        error: '',
        instance: null,
        isInjected: false,
        networkId: null
      },
      block: {
        blockNumber: 0,
        timeStamp: 0,
        hash: 0
      },
      user: {
        coinbase: '',
        balance: '',
        email: '',
        firstName: '',
        lastName: '',
        hasCoinbase: false,
        hasWeb3InjectedBrowser: false,
        isConnectedToApprovedNetwork: false,
        isLoggedIn: false
      },
      recipient: {
        coinbase: '',
        balance: ''
      },
      login: {
        new_login: true,
        firstName: '',
        lastName: ''
      },
      zenbuToken: {
        address: '',
        totalSupply: 0,
        balances: [],
        name: '',
        symbol: ''
      },
      project: {
        project_contractAddress: '',
        project_transactionHash: '',
        project_blockNumber: '',
        project_coinbaseAddress: '',
        project_id: 0,
        project_img: '/public/logo-48.png',
        project_leader: '',
        project_title: '',
        project_description: '',
        project_tags: '',
        project_img_id: 0,
        project_timestamp: 0,
        project_donation: 0
      },
      bzz: {
        flag: false,
        hash: '',
        photo_id: '',
        photo_id_html: ''
      },
      projectContracts: {
        hashs: [],
        addresses: [],
        text: []
      }
    },
    actions,
    mutations,
    getters
  })
}
