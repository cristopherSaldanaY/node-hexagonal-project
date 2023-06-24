import { v4 as uuidv4 } from 'uuid'
import { UserPasswordService } from './services/user-password.service'
import User, { UserProperties } from './user'
import { EmailVO } from '../domain/value-objects/email.vo'
import {
	UserLastnameRequiredException,
	UserNameRequiredException,
	UserPasswordRequiredException,
	UserPasswordLengthInvalidException,
} from './exceptions/user.exception'
import { err, ok, Result } from 'neverthrow'

export type UserResult = Result<
	User,
	| UserNameRequiredException
	| UserLastnameRequiredException
	| UserPasswordRequiredException
	| UserPasswordLengthInvalidException
>

/* DESIGN PATTERN: Abstract Factory */
export default class UserFactory {
	async create(name: string, lastname: string, email: EmailVO, password: string): Promise<UserResult> {
		if (!name || name.trim() === '') {
			return err(new UserNameRequiredException())
		}

		if (!lastname || name.trim() === '') {
			return err(new UserLastnameRequiredException())
		}

		if (!password || name.trim() === '') {
			return err(new UserPasswordRequiredException())
		}

		if (password.length < 5) {
			return err(new UserPasswordLengthInvalidException(password))
		}

		/* creamos el hash para el password */
		/* Design Pattern Method Factory: https://refactoring.guru/es/design-patterns/factory-method  */
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
		return ok(user)
	}
}
