// 引入二次封装http
import http from '../../module/http'
import {
  IS_MENU
}from './const'
const actionCreator = {
    get_menu () {
      return (dispatch) => {
        http.ajax(
          {url: '/api/menu.json'}
        ).then(res => {
          let action = {
            type: IS_MENU,
            is_menu:res
          }
          dispatch(action)
        })
      }
    }
}

export default actionCreator