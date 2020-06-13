import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import ui from './reducers/ui'
import me from './reducers/me'
import near from './reducers/near'
import explore from './reducers/explore'
import wallet from './reducers/wallet'

const initialState = {}

const reducer = combineReducers({
  ui,
  me,
  near,
  explore,
  wallet
})

let middleware = composeWithDevTools(
  applyMiddleware(
    logger
  )
)
if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(
  )
}

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    middleware
  )
}