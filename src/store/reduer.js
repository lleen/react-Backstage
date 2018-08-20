
import { combineReducers } from 'redux'

import ypx from './ypx'
import jzx from './jzx'

const reducer = combineReducers({
  ypx,
  jzx
})

export default reducer