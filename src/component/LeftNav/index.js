import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
const SubMenu = Menu.SubMenu;

class LeftNav extends Component {
  constructor (props) {
    super(props)
    this.clickMenu = this.clickMenu.bind(this)
  }
  // 接收一个参数，来控制是否显示
    state = {
      collapsed: false,
    };
    
    onCollapse = (collapsed) => {
      this.setState({ collapsed });
    }

    clickMenu ({ key }) {
      console.log(key)
      this.props.history.push(key)
    }

    checkmenu () {
      let { menuconfig } = this.props
      if(!menuconfig) return ''
      return menuconfig.map(item => {
        if(item.children && item.children.length){
          return (
            <SubMenu
            key = {item.path}
            title={<span><Icon type="user" /><span>{ item.title }</span></span>}
            >
            {
              item.children.map(children => {
                return <Menu.Item key= {children.path} >{children.title}</Menu.Item>
              })
            }
            </SubMenu>
          )
        }
        return (
          <Menu.Item key={ item.path}>
          <Icon type="pie-chart" />
          <span>{item.title}</span>
          </Menu.Item>
        )
      })
    }

    isHome(){
      if(this.props.location.pathname === '/'){
        return '/Storage'
      }
      return this.props.location.pathname
    }

    render() {
      return (
        <div className="left-nav">
          <div className="logo" />
          <Menu theme="dark"   onClick = { this.clickMenu }
            selectedKeys = {[this.props.location.pathname]} 
            defaultOpenKeys = {['/','/ProductInformation']}
            defaultSelectedKeys = { [this.isHome()]} 
            mode="inline">
              {
                this.checkmenu()
              }
          </Menu>
        </div>
      );
  }
}
    
export default withRouter(LeftNav)



// <Menu.Item key="2">
// <Icon type="desktop" />
// <span>Option 2</span>
// </Menu.Item>
// <SubMenu
// key="sub1"
// title={<span><Icon type="user" /><span>User</span></span>}
// >
// <Menu.Item key="3">Tom</Menu.Item>
// <Menu.Item key="4">Bill</Menu.Item>
// <Menu.Item key="5">Alex</Menu.Item>
// </SubMenu>
// <SubMenu
// key="sub2"
// title={<span><Icon type="team" /><span>Team</span></span>}
// >
// <Menu.Item key="6">Team 1</Menu.Item>
// <Menu.Item key="8">Team 2</Menu.Item>
// </SubMenu>
// <Menu.Item key="9">
// <Icon type="file" />
// <span>File</span>
// </Menu.Item>