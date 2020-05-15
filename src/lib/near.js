import getConfig from '../config';
import * as nearAPI from 'near-api-js';

class Near {
  constructor() {
    this.contract = {}
    this.currentUser = null
    this.config = {}
    this.wallet = {}
  }

  async init() {
    const nearConfig = getConfig(process.env.NODE_ENV || 'development')

    // Initializing connection to the NEAR DevNet
    const near = await nearAPI.connect({
      deps: {
        keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
      },
      ...nearConfig
    })
  
    // Needed to access wallet
    const wallet = new nearAPI.WalletConnection(near)
  
    // Load in account data
    let currentUser
    if (wallet.getAccountId()) {
      currentUser = {
        accountId: wallet.getAccountId(),
        balance: (await wallet.account().state()).amount
      }
    }
  
    // Initializing our contract APIs by contract name and configuration
    const contract = await new nearAPI.Contract(wallet.account(), nearConfig.contractName, {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: [
        'getMementoList',
        'getMementoById',
        'getPostList', 
        'getPostById',
        'getUserList',
        'getUserById',
        'getUserByUsername',
      ],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: [
        'devDeleteAllMemento',
        'devDeleteAllPost',
        'devDeleteAllUser',
        'createMemento',
        'updateMementoById',
        'deleteMementoById',
        'createPost', 
        'deletePostById',
        'createUser',
        'updateUserById',
        'toggleUserFollow'
      ],
      // Sender is the account ID to initialize transactions.
      // getAccountId() will return empty string if user is still unauthorized
      sender: wallet.getAccountId()
    })
  
    this.contract = contract
    this.currentUser = currentUser
    this.config = nearConfig
    this.wallet = wallet
  }
}

const near = new Near()

export default near