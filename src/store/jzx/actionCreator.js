// 引入二次封装http
import http from '../../module/http'
import {
  IS_MENU,
  IS_USER_LOGIN
}from './const'
const actionCreator = {
  get_init (fill) {
    if(!sessionStorage.user_state) fill();
    let user_state = JSON.parse(sessionStorage.user_state || '{}')
    return {
      type: IS_USER_LOGIN,
      user_state:user_state
    }
  },
    get_menu () {
      return (dispatch) => {
        http.ajax(
          {
            url: '/api/menu.json'
          }
        ).then(res => {
          let action = {
            type: IS_MENU,
            is_menu:res
          }
          dispatch(action)
        })
      }
    },

    get_login ({username, password, success, fill = () => {} }) {
      return dispatch => {
        http.ajax({
          url:'http://localhost:3002/login',
          method: 'post',
          params:{username, password}
        }).then(res => {
          let action = {
            type: IS_USER_LOGIN,
            user_state:res
          }
          sessionStorage.user_state = JSON.stringify(res)
          dispatch(action)
          
          if(success) success()

        }).catch(error => {

          if(fill) fill(error)

        })
      }
    }
}

export default actionCreator