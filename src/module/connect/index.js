import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import actionCreater from './actionCreater'
// export default connect(TodoUI,{reducer:'abc' })
// 在这里的...是剩余展开符
const _connect = (UIComponent, ...reducerOptions) => {

  // 根据情况设置这个 mapSateToProps
  let mapSateToProps = (state) => {

    // 如果什么都不传，将获得所有状态
    if(!reducerOptions.length) return state;

    // 返回一个过滤后的状态
    let _state = {}

    // 遍历这个对象，进行判断
    reducerOptions.forEach(reducer => {
      // 如果遍历的这个reducer为字符串类型，那就是reducer的名字
      if((typeof reducer) === 'string'){
        if(state[reducer]){ // 判断这个状态是否存在,如果存在就把这个状态返回
          _state[reducer] = state[reducer]
        }
      }else{
        // 如果对象有这个rducer
        if(state[reducer.reducer]){
          // 如果没有传state,就返回所有
          if( !reducer.state || !reducer.state.length){
            _state[reducer.reducer] = state[reducer.reducer]
          }else{
            _state[reducer.reducer] = {}
            reducer.state.forEach(s => {
              _state[reducer.reducer][s] = state[reducer.reducer][s]
            })
          }
        }
      }
    })
    return _state
  }

  let mapDispathToProps = (dispatch) => {
    // 如果什么都不传，将不会获得方法
    if (!reducerOptions.length) return {};
    let action = {}
    reducerOptions.forEach(reducer => {
      if ((typeof reducer) === 'string') {
        if (actionCreater[reducer]) {
          // 为了避免名字冲突
          action[reducer + '_action'] = bindActionCreators(actionCreater[reducer],dispatch)
        }
      } else {
        if (actionCreater[reducer.reducer]) {
          action[reducer.reducer + '_action'] = bindActionCreators(actionCreater[reducer.reducer],dispatch)
        }
      }
    })
    return action
  }

  return connect(mapSateToProps, mapDispathToProps)(UIComponent)

}

export default _connect