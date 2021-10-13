form.onsubmit = async event => {
	event.preventDefault()
	let newUser = {
		username: usernameInput.value,
		password: passwordInput.value,
		age: ageInput.value,
		gender: genderInput.value,
		contact: contactInput.value,
		bio: bioInput.value,
	}
// console.log(newUser);
	let response = await request('/register', 'POST', newUser)

	if(response.status == 201) {
		response = await response.json()
		window.localStorage.setItem('token', response.token)
		window.localStorage.setItem('username', usernameInput.value)
		message.textContent = response.message
		message.style.color = 'green'
		setTimeout( () => {
			window.location.href = '/'
		}, 2000)
	} else {
		response = await response.json()
		message.textContent = response.message
		message.style.color = 'red'
	}
}