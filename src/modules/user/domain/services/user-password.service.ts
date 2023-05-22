import bcrypt from 'bcryptjs'

/* procesamiento logico de la encriptación */
export class UserPasswordService {
	/* metodo estatico  */
	/* devolvera una promesa, por que el metodo hash que viene dentro de bcryp es una Promise */
	/* primer argumento el password, el segundo es el salty para decir cuantas iteraciones hara a partir de la cadena */
	static hash(password: string): Promise<string> {
		return bcrypt.hash(password, 10)
	}
}
