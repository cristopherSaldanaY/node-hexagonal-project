//importamos para usar tipado de typescript
import { Router, Request, Response } from 'express'


class RouterHealth {
	//solo lectura para manejar las rutas de tipo interface Router
	readonly expressRouter: Router


	constructor() {
		//inicializar la referencia al manejador de rutas
		this.expressRouter = Router()
		this.mountRoutes()
	}

	//funcion para responder cuando se visite la ruta raiz '/'
	mountRoutes() {
		//se puede usar get, porque expressRouter es de tipo Router
		this.expressRouter.get('/', (_req: Request, res: Response) => res.send('All is ok'))
	}
}

export default new RouterHealth().expressRouter //de la instancia de RouterHealth dejara exportable de esta clase el expressRouter
