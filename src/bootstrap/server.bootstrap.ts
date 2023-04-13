import http from 'http'
import { Application } from 'express'
import { Bootstrap } from './base.bootstrap'

export default class extends Bootstrap {
	constructor(private readonly app: Application) {
		super() /* necesitamos apuntar a la super clase, por la dependencia */
	}

	/* Principio SOLID: Liskov Sustitution */
	/* Principio SOLID: Single Responsability */
	initialize() {
		return new Promise<string | Error>((resolve, reject) => {
			const server = http.createServer(
				this.app /* instancia del server, usando http mandando la referencia de app */,
			)
			server
				.listen(3000) /* listen quiere decir en que puerto yo expondre el servidor */
				.on('listening', () => {
					/* le añadiremos evento listening, se propagara para describir que por el puerto esta correctamente */
					resolve('Promise resolve successfull')
					console.log('Listening server on port 3000')
				})
				.on('error', error => {
					reject(error)
					console.log('error on port 3000')
				})
		})
	}
}
