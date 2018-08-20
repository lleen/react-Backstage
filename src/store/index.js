
import { createStore,applyMiddleware } from 'redux'
// 异步处理工具
import thunk from 'redux-thunk'

import reducer from './reduer'

const store = createStore(reducer,applyMiddleware(thunk))

export default store