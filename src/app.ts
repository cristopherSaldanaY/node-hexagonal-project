import express, {
	Application,
} from 'express' /* Application es para tipar tu propiedad que sera de tipo Application Express */
import routerHealth from './helpers/health' //traemos el Helper
import HandlerErrors from './helpers/errors' //importamos el helper error

/*
	La app se arma a partir de la Clase App
	Tendra las especificaciones que despues recibira el servidor (middlewares, manipulación de datos, rutas, etc.)
 */
class App {
	readonly expressApp: Application //1 esta propiedad sera solo de lectura

	//2 inicializar la referencia de expressApp que sera de express que importamos que tiene todas las caracteristica
	// del core de express
	constructor() {
		this.expressApp = express()
		this.mountHealthCheck() //validamos que el servidor esta funcionando
		this.mountMiddlewares() //habilitamos el comportamiento de trabajo
		//RUTAS
		this.mountError() //validamos las rutas con error
	}

	/* 3 metodos de clase */

	/*
	definicion auxiliar de consulta de salud, especificamos una ruta, al consultarla sabemos si el servidor esta activo o no
	expressApp es el que tienes las facultades de express que le dimos en el constuctor
	El metodo use de express me permite especificar definiciones a nivel de aplicacion para mi ruta */
	/* Principio SOLID: OPEN/CLOSE */
	mountHealthCheck() {
		this.expressApp.use(
			'/',
			routerHealth,
		) /* si consulto la ruta raiz, ejecutaremos un comportamiento con un helper (lo crearemos en src)*/
	}

	mountMiddlewares() {
		this.expressApp.use(express.json()) //para usar parse a json desde express

		//protege el payload haciendo el encoded de los datos express.json que lleguen en las solicitudes
		//la propiedad extended lo que hace es ir a verificar si es que en el codigo ya tengo un middleware con json (el anterior express.json)
		this.expressApp.use(express.urlencoded({ extended: true }))
	}

	mountError(): void {
		this.expressApp.use(HandlerErrors.notFound) //usamos directamente ya que es una clase anonima y tiene static el metodo
	}
}

export default new App().expressApp
