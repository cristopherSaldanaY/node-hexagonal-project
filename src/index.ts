import ServerBootstrap from './bootstrap/server.bootstrap'
import DatabaseBootstrap from './bootstrap/database.bootstrap'
import { Bootstrap } from './bootstrap/base.bootstrap' // clase padre para tipar los datos
import Application from './app' //aplicació

/* de tipo Bootstrap, nueva instancia de ServerBootstrap y pasamos la aplicacion */
const serverBootstrap: Bootstrap = new ServerBootstrap(Application)
const databaseBootstrap: Bootstrap = new DatabaseBootstrap()



//funcion auto invocada
;(async () => {
	try {
		await serverBootstrap.initialize() /* inicializacion server */
		await databaseBootstrap.initialize() /* inicializacion bd */
		console.log('Server started successfully')
	} catch (error) {
		console.log(error)
	}
})()
