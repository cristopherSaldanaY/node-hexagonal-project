/* Application es para tipar tu propiedad que sera de tipo Application Express */
import express, { Application } from 'express';

/*
	La app se arma a partir de la Clase App
	Tendra las especificaciones que despues recibira el servidor (middlewares, manipulación de datos, rutas, etc.)
 */
class App {

	//1 esta propiedad sera solo de lectura
	readonly expressApp: Application

	//2 inicializar la referencia de expressApp que sera de express que importamos que tiene todas las caracteristica
	// del core de express
	constructor(){ this.expressApp = express() }

	/* 3 metodos de clase */

	//definicion auxiliar de consulta de salud, especificamos una ruta, al consultarla sabemos si el servidor esta activo o no
	//expressApp es el que tienes las facultades de express que le dimos en el constuctor
	//El metodo use de express me permite especificar definiciones a nivel de aplicacion para mi ruta
	mountHealthCheck(){
		/* si consulto la ruta raiz, ejecutaremos un comportamiento con un helper (lo crearemos en src)*/
		this.expressApp.use('/')
	}
}

export default new App().expressApp;
