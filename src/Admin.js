import React, { Component } from 'react';
import { Layout,  Breadcrumb,  } from 'antd';
import LeftNav from './component/LeftNav'
import connect from './module/connect'
import { withRouter } from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;


class Admin extends Component {
  // 接收一个参数，来控制是否显示
    state = {
      collapsed: false,
    };
    
    componentDidMount () {
      if(!this.props.jzx.is_menu){
          this.props.jzx_action.get_menu()
      }
    }

    onCollapse = (collapsed) => {
      console.log(collapsed);
      this.setState({ collapsed });
    }
  
    render() {
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >

          <LeftNav menuconfig = { this.props.jzx.is_menu }></LeftNav>

          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {
                  this.props.children
                }
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      );
  }
}
    
export default withRouter(connect(Admin,'jzx'))