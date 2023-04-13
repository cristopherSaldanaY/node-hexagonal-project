//Helper para errores, en caso de que se envie una ruta que no existe

//importamos las interfaces de Request y Response
import { Request, Response } from 'express'

//ejemplo de clase anonima
export default class {

	//metodo notFound, tendra el contexto de la solicitud y respuesta y no retornara nada
	static notFound(_req: Request, res: Response): void{
		//enviar status code 404
		res.status(404).send('Not Found')
	}
}
