
import state from './state'
const reducer = ( preventDefault = state, action) => { 
  
  let new_sate = { ...preventDefault }

  switch(action.type){
    default:break;
  }

  return new_sate
}

export default reducer