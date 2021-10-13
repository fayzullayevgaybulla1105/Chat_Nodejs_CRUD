import os from 'os'
// const host = os.networkInterfaces()['Wi-Fi'].find(wifi => wifi.family === 'IPv4' && wifi.internal === false).address
let host = 'localhost'
// let host = '192.168.1.3'

const PORT = 4025
const PRIVATE_KEY = 'PRIVATE'

export {
	PRIVATE_KEY,
	host,
	PORT
}