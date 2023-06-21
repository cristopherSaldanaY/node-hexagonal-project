import { v4 as uuidv4 } from 'uuid'

import { UserPasswordService } from './services/user-password.service'
import User, { UserProperties } from './user'
import { EmailVO } from '../domain/value-objects/email.vo'

/* DESIGN PATTERN: Abstract Factory */
export default class UserFactory {
	async create(name: string, lastname: string, email: EmailVO, password: string) {
		/* creamos el hash para el password */
		const passwordHash = await UserPasswordService.hash(password)

		/* objeto que tendra todas las propiedades */
		const userProperties: UserProperties = {
			name,
			lastname,
			email,
			password: passwordHash /* asignamos el hash que hemos creado */,
			guid: uuidv4() /* creamos el uuid con la libreria */,
			refreshToken: uuidv4(),
		}

		/* creamos una objeto de la clase */
		const user = new User(userProperties) /* le pasamos las properties que hemos creado */

		/* retornamos el usuario creado */
		return user
	}
}
