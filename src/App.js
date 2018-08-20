import React, { Component } from 'react';
import connect from './module/connect'
import IsLoading from './component/IsLoading'
import { withRouter } from 'react-router-dom'
class App extends Component {
  state = {
    IsLoadin: false
  }

  componentWillMount () {
    this.props.jzx_action.get_init(()=>{
      // 当进入某个路由的时候就进行判断
      this.IsLogin(this.props)
    })
      
    // 为bus绑定一个事件，控制loading
    this.bus.on('app-IsLoading',(bool)=>{
      this.setState({
        IsLoadin: bool
      })
    })
    
  }

  componentWillReceiveProps (props) {
    let { pathname } = props.location
    if( pathname !== this.props.location.pathname){
      this.IsLogin(props)
    }
  }

  IsLogin (props) { // 判断是否登录
    let { jzx, history } = this.props
    // 如果传入的props的pathname不等于login
    if( props.location.pathname !== '/Login'){
      // 并且user_state状态为null
        if(!jzx.user_state){
          history.replace('/Login')
        }
    }
  }


  render() {
    return (
      <div className="App">
        <IsLoading  loading = { this.state.IsLoadin }></IsLoading>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(connect (App, 'jzx'));
