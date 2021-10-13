import jwt from '../lib/jwt.js'
import fs from 'fs'
import path from 'path'

const POST  = (req, res) => {
	try {
		if(!req.headers.token) throw 'The token required!'
		let payload = jwt.verify(req.headers.token)
		let { userId, username } = payload
		let data = ''
		req.on('data', (chunk) => data += chunk)
		req.on('end', () => {
			let { message_text, message_time } = JSON.parse(data)
			let todos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'messages.json'), 'UTF-8')
			todos = todos ? JSON.parse(todos) : []

			let todoId = todos.length ? todos[ todos.length - 1 ].todo_id + 1 : 1
			let newTodo = { todo_id: todoId, message_text, message_time, user_id: userId, username}
			todos.push(newTodo)
			fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'messages.json'), JSON.stringify(todos, null, 4))

			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.write(
				JSON.stringify({
					status: 200,
					message: 'Success!',
					data: newTodo
				})
			)
			return res.end()
		})

	} catch(error) {
		res.writeHead(500, { 'Content-Type': 'application/json' })
		res.write(
			JSON.stringify({
				status: 500,
				message: error
			})
		)
		return res.end()
	}
}

export {
	POST
}