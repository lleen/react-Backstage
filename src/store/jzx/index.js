
import state from './state'
import {
  IS_MENU
}from './const'
const reducer = ( preventDefault = state, action) => { 
  
  let new_sate = { ...preventDefault }

  switch(action.type){
    case IS_MENU:
      new_sate.is_menu = action.is_menu
      break;

    default:break;
  }
  return new_sate
}

export default reducer