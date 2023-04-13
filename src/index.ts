import ServerBootstrap from './bootstrap/server.bootstrap' //
import { Bootstrap } from './bootstrap/base.bootstrap' // clase padre para tipar los datos
import Application from './app' //aplicación

/* de tipo Bootstrap, nueva instancia de ServerBootstrap y pasamos la aplicacion */
const serverBootstrap: Bootstrap = new ServerBootstrap(Application)

/*
	Para resolver una promesa
	1- try catch => Async await
	2- then catch
*/

//funcion auto invocada
;(async () => {
	try {
		const resultServer = await serverBootstrap.initialize()
		console.log(resultServer)
	} catch (error) {
		console.log(error)
	}
})()
