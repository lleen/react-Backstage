import React, { Component } from 'react';
import './index.scss'

import { Spin } from 'antd';

class Loading extends Component{
  // 接收一个参数，来控制是否显示
  render () {
    let { loading }  = this.props
    console.log(loading, 666)
    return (
      <div style={{  display:loading ? 'block' : 'none'}} className = "Loading">
        <Spin 
        size="large" 
        spinning={loading} 
        delay={500}
        tip = "正在努力加载中..."/>
      </div>
    )
  }
}

export default Loading