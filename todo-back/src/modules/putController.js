import jwt from '../lib/jwt.js'
import fs from 'fs'
import path from 'path'

const PUT  = (req, res) => {
	try {
		if(!req.headers.token) throw 'The token required!'
		let payload = jwt.verify(req.headers.token)
		let { userId } = payload
		let data = ''
		req.on('data', (chunk) => data += chunk)
		req.on('end', (chunk) => {
			let { todo_id, message_text } = JSON.parse(data)
			let todos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'messages.json'), 'UTF-8')
			todos = todos ? JSON.parse(todos) : []

			let todo = todos.find( todo => todo.todo_id == todo_id && todo.user_id == userId )

			if(todo) {
				todo.message_text = message_text || todo.message_text
				fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'messages.json'), JSON.stringify(todos, null, 4))

				res.writeHead(200, { 'Content-Type': 'application/json' })
				res.write(
					JSON.stringify({
						status: 200,
						message: 'The todo updated!',
						data: todo
					})
				)
				return res.end()
			} else {
				res.statusCode = 204
				return res.end()
			}
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
	PUT
}