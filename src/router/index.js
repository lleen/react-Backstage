import React, { Component } from 'react';

import { 
  BrowserRouter as Router,
  Route, Switch
 } from 'react-router-dom'

// 配置路由的跳转
import App from '../App'
import Admin from '../Admin'
import Login from '../pages/Login'

// 各个模块配置
import Storage from '../pages/Storage/management'
import addStorage from '../pages/Storage/addStorage'
import addGoodslist from '../pages/ProductInformation/addGoodslist'
import GoodsManagement from '../pages/ProductInformation/GoodsManagement'
import ChangePassword from '../pages/changePassword'
import AddSupplie from '../pages/Business/AddSupplier'


export default class extends Component {
    render () {
      return (
        <Router>
            <App>
              <Switch>
                  <Route path="/Login" component = { Login } />
                  <Route path="/" render = { () => (
                    <Admin>
                        <Switch>
                          <Route exact path = "/" component = { Storage }></Route>
                          <Route exact path = "/Storage/addStorage" component = { addStorage }></Route>

                          <Route path= "/ProductInformation/addGoodslist" component = { addGoodslist }></Route>
                          <Route path= "/ProductInformation/GoodsManagement" component = { GoodsManagement }></Route>

                          <Route path= "/changePassword" component = { ChangePassword }></Route>


                          <Route path= "/Business/AddSupplie" component = { AddSupplie }></Route>


                        </Switch>
                    </Admin>
                  )} /> 
              </Switch>
            </App>
        </Router>
      )
    }
}