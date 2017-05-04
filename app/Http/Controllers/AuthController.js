'use strict'

class AuthController {

	* login(request, response) {
		const email = request.input('email')
		const password = request.input('password')
		const login = yield request.auth.attempt(email,password)
		yield response.redirect('/role')
	}

	* logout(request, response) {
		yield response.auth.logout()
		yield response.redirect('/')
	}
}

module.exports = AuthController
