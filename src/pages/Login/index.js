
import React, { Component } from 'react'
import connect from '../../module/connect'
import './index.scss'
class Login extends Component {
	constructor(props) {
		super(props)
		this.WhetherToLogin = this.WhetherToLogin.bind(this)
	}
	WhetherToLogin(e) {
		e.preventDefault()
		let username = this.username.value
		let password = this.password.value
			this.props.commons_action.login({
				username, password,
				success: () => {
					this.props.history.push('/')
				}
			})

	}
	render() {
		return (
			<div className="app-login">
				<div className="login-form">
					<div className="avtar">
						<img src="/images/login/avtar.png" alt="" />
					</div>
					<form onSubmit={this.WhetherToLogin}>
						<input ref={el => this.username = el} required type="text" className="text" />
						<div className="key">
							<input ref={el => this.password = el} required type="password" />
						</div>
						<div className="signin">
							<input type="submit" value="Login" />
						</div>
					</form>
				</div>
			</div>
		)
	}

}

// export default Login
export default connect(Login, 'commons')
